import { Form, Card, Button } from 'react-bootstrap';
import ProgressAnimation from '../components/ProgressAnimation';
import InputField from '../components/InputField';
import InputSelect from '../components/InputSelect'
import dataTransaction from '../data/transaction.json';
import { useState } from 'react';
import Router from 'next/router'
import { methodRequet,valideNumbersOnly,isEmpty,reStartDataInit } from '../utils';

const FormTrasaction = (props) =>{
    console.log(props);
    const [dataForm, setTransaction] = useState(
        dataTransaction
    );
    const data = dataForm.data;
    const [showProgress, setShowProgress] = useState(false);
    const dataURL = {
        account:props.id_account,
        atm:props.atm,
        actToAct:props.actToAct
    }
    const tagOnChange = ( e ) => {
        const { data, errors } = { ...dataForm };
        const currentState = data;
        const { name, value } = e.target;
        currentState[name]["value"] = value;
        setTransaction({ data:currentState , errors: errors });
    }
     const formValidation = (dataFormValidate) => {
        let formIsValid = true;
        const { data, errors } = dataFormValidate;
        const currentState = Object.values(data);
        for (let index = 0; index < currentState.length; index++) {
            if(currentState[index]['validate']){
                if (currentState[index]['value'] == "") {
                    formIsValid = false;
                    errors[currentState[index]['var']] = currentState[index]['label']+' is required';
                } else {
                    errors[currentState[index]['var']] = '';
                }
            }
        }
        setTransaction({ data:data , errors: errors });
        return formIsValid;
    }
    const registerTransactionSubmit = async ( e ) =>{
        if(formValidation(dataForm)){
            setShowProgress(true);
            let dataBalance = await methodRequet([],'balanceForAccount/','GET',props.id_account);
            if(dataBalance.balance > data.value_transaction.value){
                setShowProgress(true);
                let newBalance = dataBalance.balance - data.value_transaction.value;
                let positionData = data.numberAccount_transaction.value - 1;
                let dataMoveContable = {
                    "value_transaction":data.value_transaction.value,
                    "accounts_addressee":props.actToAct[positionData]['account_association'],
                    "type_transaction": props.optTypeTrans,
                    "balance":newBalance,
                    "id_balance":dataBalance.id_balances
                }
                await finishTransaction(dataMoveContable);
                if(props.actToAct[positionData]['banks'] != props.id_banks){
                    alert('Esta transaccion tiene cobro!');
                    let newBalanceTwo = newBalance - 5000;
                    let dataMoveContable = {
                        "value_transaction":5000,
                        "accounts_addressee":props.actToAct[positionData]['account_association'],
                        "type_transaction": 5,
                        "balance":newBalanceTwo,
                        "id_balance":dataBalance.id_balances
                    }
                    await finishTransaction(dataMoveContable);   
                }
                alert('Transacciones realizada conrrectamente!');
                setTimeout(() => {
                    Router.push({
                        pathname: '/statusAccount',
                        query:props.qureryURL
                    });
                }, 6000);
                reStartDataInit(dataForm);
            }else if(isEmpty(dataBalance)){
                alert('Sin data inserte de nuevo la tarjeta!');
                setTimeout(() => {
                    Router.push({
                        pathname: '/statusAccount',
                        query:props.qureryURL
                    });
                }, 4000);
                setShowProgress(false);
                reStartDataInit(dataForm);
            }else{
                alert('Su saldo no es insuficiente!');
                setShowProgress(false);
                reStartDataInit(dataForm);
            }
        }
    }
    const finishTransaction = async (dataTran) =>  {
        let idAccount = props.id_account;
        let idAtm = props.atm;
        let dataTransaction = {
            "value_transaction":dataTran.value_transaction,
            "accounts_origin": idAccount,
            "accounts_addressee":dataTran.accounts_addressee,
            "atm_id_atm":idAtm,
            "type_transaction": dataTran.type_transaction
        }
        let dataRespCreditCard = await methodRequet(dataTransaction,'transaction ','POST','');
        if(!isEmpty(dataRespCreditCard)){
            let dataAccountingSeat = {
                'debit':0,
                'credit':dataTran.value_transaction,
                'id_transaction':dataRespCreditCard.id_transaction
            }
            await methodRequet(dataAccountingSeat,'account_seat','POST','');
            let dataBalance = {
                'balance':dataTran.balance,
                'id_accounts': dataTran.idAccount
            }
            await methodRequet(dataBalance,'balance/','PUT',dataTran.id_balance);
                Router.push({
                    pathname: '/statusAccount',
                    query:dataURL
            });
        }
    }
    const asociarCuenta = (e)=>{
        Router.push({
            pathname: '/account_cr',
            query:props.qureryURL
        });
    }
    const goToMenuAtm = () =>{
        Router.push({
            pathname: '/menuAtm',
            query: props.qureryURL
        });
    }
    return (
        <div>
            <Card className="pt-3">
                <Card.Header className="white-text text-start d-flex justify-content-around">
                    <strong>Datos de {props.nameTrans} - # {props.number_account} - {props.name_bank}</strong>
                    <button onClick={goToMenuAtm} type="button" className="btn btn-outline-info">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </button>
                </Card.Header>
                <Card.Body className="px-lg-5 pt-1">
                    <Form.Row>
                        <InputField
                            unique="basicInfoValTrans"
                            label={data.value_transaction.label}
                            name={data.value_transaction.var}
                            onChange={tagOnChange}
                            typetag ="number"
                            onKeyDown={valideNumbersOnly}
                            value={data.value_transaction.value}
                            error={dataForm.errors.value_transaction}
                        />
                        <InputSelect 
                            unique="basicInfoNumActTrans"
                            label={data.numberAccount_transaction.label}
                            name={data.numberAccount_transaction.var}
                            value={data.numberAccount_transaction.value}
                            optionvalue={props.actToAct}
                            onChange={tagOnChange}
                            error={dataForm.errors.numberAccount_transaction}
                        />
                    </Form.Row>
                    <button onClick={registerTransactionSubmit} className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Realizar Transacción</button>
                    <button onClick={asociarCuenta} className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Asociar Cuenta</button>
                </Card.Body>
            </Card>
            <ProgressAnimation show={showProgress}/>
        </div>
    )
}

export default FormTrasaction;