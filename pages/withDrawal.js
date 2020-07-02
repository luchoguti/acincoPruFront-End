import React from 'react';
import Router from "next/router";
import { withRouter } from 'next/router';
import { Form, Alert, Button } from 'react-bootstrap';
import InitPage from '../components/InitPage';
import DataForm from '../data/withdrawal_data.json';
import InputField from '../components/InputField';
import {multiplesFourValidate, valideNumbersOnly, methodRequet, isEmpty} from '../utils/index';
import ProgressAnimation from '../components/ProgressAnimation';

class WithDrawal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: DataForm.data,
            errors: DataForm.errors,
            showProgress:false,
            tryPassword:0,
            id_balance:'',
            balance:0
        };
    }
    componentDidMount() {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
          linear: false,
          animation: true
        })
    }
    // Input field onChange handler
    tagOnChange = ( e ) => {
        const  dataNew  = { ...this.state.data };
        const { name, value } = e.target;
        dataNew[name]["value"] = value;
        this.setState({
            data: dataNew
        })
    }
    openAnimation = () =>{
        this.setState({
            showProgress:true
        });
    }
    closeAnimation = () =>{
        this.setState({
            showProgress:false
        });
    }
    verificationBalancePartTwo = () => {
        this.openAnimation();
        setTimeout(() => {
            this.closeAnimation();    
            alert('Existe esa cantidad en el cajero');
            let dataRequest = [];
            const { router } = this.props;
            let idAccount = router.query.id_accounts;
            this.openAnimation();
            let dataBalance = methodRequet(dataRequest,'balanceForAccount/','GET',idAccount);
            dataBalance.then((value) => {
                this.closeAnimation(); 
                if(value.balance > this.state.data.value_transaction.value){
                    let valBalance = value.balance - this.state.data.value_transaction.value;
                    this.setState({
                        id_balance:value.id_balances,
                        balance: valBalance
                    });   
                    this.stepper.next();
                }else if(isEmpty(value)){
                    alert('Sin data inserte de nuevo la tarjeta!');
                    Router.push({
                        pathname: '/'
                    });
                }else{
                    alert('Su saldo no es insuficiente!');
                }
            });
        }, 3000);

    }
    verificationBalancePartOne = (e) =>{
        let validate = multiplesFourValidate(this.state.data.value_transaction.value);
        let newErros = this.state.errors;
        if(!validate){
            newErros['value_transaction'] = 'El valor digitado debe ser multiplo de 5';
        }else{
            newErros['value_transaction'] = '';
            this.verificationBalancePartTwo();
        }
        this.setState({
            errors: newErros
        });
    }
    validatePassword = () =>{
        const { router } = this.props;
        let idAccount = router.query.id_accounts;
        this.openAnimation();
        let dataRequest = {
            'id_account':idAccount,
            'password_account':this.state.data.password_account.value
        };
        let valitePasswordAccout = methodRequet(dataRequest,'verificationPasswordAccount','POST','');
        let newErros = this.state.errors;
        valitePasswordAccout.then((value) => {
            if(!value){
                let tryPa=this.state.tryPassword+1;
                let str='Contraseña incorrecta';
                if(tryPa==2){
                    alert('Ha caducado en numero de intentos permitidos');
                    Router.push({
                        pathname: '/'
                    });
                }else{
                    str+= ', numero de intentos '+tryPa+'.'
                }
                newErros['password_account'] = str;
                this.setState({
                    errors: newErros,
                    tryPassword:tryPa
                });
            }else{
                this.stepper.next();
            }
            this.closeAnimation();
        });
    }
    finishTransaction = (option) =>  {
        this.openAnimation();
        setTimeout(() => {
            if(option){
                alert('Se imprimio el voucher!');
            }
            const { router } = this.props;
            let idAccount = router.query.id_accounts;
            let idAtm = router.query.atm;
            let dataTransaction = {
                "value_transaction":this.state.data.value_transaction.value,
                "accounts_origin": idAccount,
                "accounts_addressee": null,
                "atm_id_atm":idAtm,
                "type_transaction": 1
            }
            this.openAnimation();
            let dataRespCreditCard = methodRequet(dataTransaction,'transaction ','POST','');
            dataRespCreditCard.then((value) => {
                if(!isEmpty(value)){
                    let dataAccountingSeat = {
                        'debit':0,
                        'credit':this.state.data.value_transaction.value,
                        'id_transaction':value.id_transaction
                    }
                    methodRequet(dataAccountingSeat,'account_seat','POST','');
                    let dataBalance = {
                        'balance':this.state.balance,
                        'id_accounts': idAccount
                    }
                    methodRequet(dataBalance,'balance/','PUT',this.state.id_balance);
                    Router.push({
                        pathname: '/'
                    });
                }
            });
        }, 3000);
    }
    cancelWithDrawal = () =>{
        this.openAnimation();
        alert('Se ha cancelado el retiro.');
        Router.push({
            pathname: '/'
        });
    }
    onSubmit(e) {
        e.preventDefault()
    }
    render() {
        return (
            <InitPage>
                <div>
                    <div id="stepper1" className="bs-stepper linear">
                        <div className="bs-stepper-header">
                            <div className="step" data-target="#test-l-1">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">
                                    <i className="fa fa-usd" aria-hidden="true"/>
                                </span>
                            </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#test-l-2">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">
                                    <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                                </span>
                            </button>
                            </div>
                            <div className="line"></div>
                            <div className="step" data-target="#test-l-3">
                            <button className="step-trigger">
                                <span className="bs-stepper-circle">
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                </span>
                            </button>
                            </div>
                        </div>
                        <div className="bs-stepper-content">
                            <form onSubmit={this.onSubmit}>
                                <div id="test-l-1" className="content">
                                    <div className="card">
                                        <div className="card-header">
                                            Retiros
                                        </div>
                                        <div className="card-body">
                                            <Form.Row>
                                                <InputField
                                                    unique="basicInfoName"
                                                    label={this.state.data.value_transaction.label}
                                                    name={this.state.data.value_transaction.var}
                                                    onChange={this.tagOnChange}
                                                    typetag ="number"
                                                    minLength="4"
                                                    autoComplete="off"
                                                    onKeyDown={valideNumbersOnly}
                                                    value={this.state.data.value_transaction.value}
                                                    error={this.state.errors.value_transaction}
                                                />
                                            </Form.Row>
                                            <div className="d-flex justify-content-around">
                                                <button className="btn btn-outline-primary" onClick={this.verificationBalancePartOne}>Siguiente</button>
                                                <button className="btn btn-outline-danger" onClick={this.cancelWithDrawal}>Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="test-l-2" className="content">
                                    <div className="card">
                                        <div className="card-header">
                                                Retiros
                                            </div>
                                            <div className="card-body">
                                                <Form.Row>
                                                    <InputField
                                                        unique="basicInfoName"
                                                        label={this.state.data.password_account.label}
                                                        name={this.state.data.password_account.var}
                                                        onChange={this.tagOnChange}
                                                        typetag ="password"
                                                        maxLength="4"
                                                        autoComplete="new-password"
                                                        onKeyDown={valideNumbersOnly}
                                                        value={this.state.data.password_account.value}
                                                        error={this.state.errors.password_account}
                                                    />
                                                </Form.Row>
                                                <div className="d-flex justify-content-around">
                                                    <button className="btn btn-outline-primary" onClick={this.validatePassword }>Siguiente</button>
                                                    <button className="btn btn-outline-danger" onClick={this.cancelWithDrawal}>Cancelar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <div id="test-l-3" className="content text-center">
                                    <div className="card">
                                        <div className="card-header">
                                            Retiros
                                        </div>
                                        <div className="card-body">
                                            <Alert variant="success">
                                                <Alert.Heading>Desea Imprimir recibo?!</Alert.Heading>
                                                <p>
                                                    Recuerde que al no imprimir lo ayuda al planeta y salva a un 
                                                    arbolito.
                                                </p>
                                                <hr />
                                                <div className="d-flex justify-content-around">
                                                    <Button className="pr-2" onClick={()=>this.finishTransaction(true)} variant="outline-dark">
                                                        Imprimir y Terminar
                                                    </Button>
                                                    <Button onClick={()=>this.finishTransaction(false)} variant="outline-dark">
                                                        No Imprimir y Terminar
                                                    </Button>
                                                </div>
                                            </Alert>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ProgressAnimation show={this.state.showProgress}/>
            </InitPage>
        )
    }
}
export default withRouter(WithDrawal);