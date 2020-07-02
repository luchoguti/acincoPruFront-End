import { Form, Card, Button } from 'react-bootstrap';
import ProgressAnimation from '../components/ProgressAnimation';
import InputField from '../components/InputField';
import InputSelect from '../components/InputSelect'
import dataTransaction from '../data/transaction.json';
import { useState } from 'react';
import Router from 'next/router'
import { methodRequet,valideNumbersOnly,isEmpty,reStartDataInit } from '../utils';

const FormAccount = (props) => {
    const [dataForm, setTransaction] = useState(
        props.accountData
    );
    const data = dataForm.data;
    const [showProgress, setShowProgress] = useState(false);

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
    const registerAccount = async ()=>{
        if(formValidation(dataForm)){
            setShowProgress(true);
            if(data.id_accounts.value == ""){
                let dataAccount = {
                    "number_account":data.number_account.value,
                    "name_cardholder": data.name_cart_holder.value,
                    "id_type_document":data.type_document.value,
                    "number_identification":data.number_identification.value,
                    "banks": data.bank.value,
                    "type_account": data.type_account.value,
                    "password_account": data.password_account.value,
                    "state":false
                }
                let dataResultAccout = await methodRequet(dataAccount,'account ','POST','');
                if(dataResultAccout){
                    let dataAccToAcc = {
                        "account_origin":props.qureryURL.id_accounts,
                        "account_association":dataResultAccout.id_accounts
                    }
                    let acountToAcount = await methodRequet(dataAccToAcc,'accountToAccount','POST','');
                    if(acountToAcount){
                        alert('Se creo la cuenta exitosamente!');
                        setTimeout(() => {
                            Router.push({
                                pathname: '/account',
                                query: props.qureryURL
                            });
                        reStartDataInit(dataForm);
                        }, 3000);
                    }else{
                        alert('Ocurrio un error almacene nuevamente!');
                        setShowProgress(true);
                    }
                }else{
                    alert('Ocurrio un error almacene nuevamente!');
                    setShowProgress(false);
                }
            }else{
                let dataAccount = {
                    "number_account":data.number_account.value,
                    "name_cardholder": data.name_cart_holder.value,
                    "id_type_document":data.type_document.value,
                    "number_identification":data.number_identification.value,
                    "banks": data.bank.value,
                    "type_account": data.type_account.value
                }
                let dataResultAccout = await methodRequet(dataAccount,'account/','PUT',data.id_accounts.value);
                if(dataResultAccout){
                    alert('Se actualizo la cuenta exitosamente!');
                    setTimeout(() => {
                        Router.push({
                            pathname: '/account',
                            query: props.qureryURL
                        });
                    reStartDataInit(dataForm);
                    }, 3000);
                }else{
                    alert('Ocurrio un error almacene nuevamente!');
                    setShowProgress(true);
                }
            }
        }
    }
    return(
        <div>
            <Card className="pt-3">
                <Card.Header className="white-text text-start absolute-center  py-4">
                    <strong>Información de la Cuenta</strong>
                </Card.Header>
                <Card.Body className="px-lg-5 pt-1">
                    <Form.Row>
                        <InputField
                            unique="basicInfoNumberAccount"
                            label={data.number_account.label}
                            name={data.number_account.var}
                            onChange={tagOnChange}
                            onKeyDown={valideNumbersOnly}
                            typetag ="number"
                            maxLength="9"
                            value={data.number_account.value}
                            error={dataForm.errors.number_account}
                        />
                        <InputField
                            unique="basicInfoNameCartHolder"
                            label={data.name_cart_holder.label}
                            name={data.name_cart_holder.var}
                            onChange={tagOnChange}
                            typetag ="text"
                            value={data.name_cart_holder.value}
                            error={dataForm.errors.name_cart_holder}
                        />
                    </Form.Row>
                    <Form.Row>
                        <InputSelect 
                            unique="basicInfoTypeDoment"
                            label={data.type_document.label}
                            name={data.type_document.var}
                            value={data.type_document.value}
                            optionvalue={props.type_document}
                            onChange={tagOnChange}
                            error={dataForm.errors.type_document}
                        />
                        <InputField
                            unique="basicInfoNumberIdentific"
                            label={data.number_identification.label}
                            name={data.number_identification.var}
                            onChange={tagOnChange}
                            onKeyDown={valideNumbersOnly}
                            typetag ="number"
                            maxLength="9"
                            value={data.number_identification.value}
                            error={dataForm.errors.number_identification}
                        />
                    </Form.Row>
                    <Form.Row>
                        <InputSelect 
                            unique="basicInfoBank"
                            label={data.bank.label}
                            name={data.bank.var}
                            value={data.bank.value}
                            optionvalue={props.bank}
                            onChange={tagOnChange}
                            error={dataForm.errors.bank}
                        />
                        <InputSelect 
                            unique="basicInfoBank"
                            label={data.type_account.label}
                            name={data.type_account.var}
                            value={data.type_account.value}
                            optionvalue={props.type_account}
                            onChange={tagOnChange}
                            error={dataForm.errors.type_account}
                        />
                        {(()=>{
                            if(data.id_accounts.value == ""){
                                return <InputField
                                    unique="basicInfoNumberIdentific"
                                    label={data.password_account.label}
                                    name={data.password_account.var}
                                    onChange={tagOnChange}
                                    onKeyDown={valideNumbersOnly}
                                    typetag ="password"
                                    maxLength="4"
                                    value={data.password_account.value}
                                    error={dataForm.errors.password_account}
                                />
                            }
                        })()}

                    </Form.Row>
                        {(()=>{
                            if(data.id_accounts.value == ""){
                                return  <button onClick={registerAccount} className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Registrar Cuenta</button>
                            }else{
                                return  <button onClick={registerAccount} className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Actualizar Cuenta</button>
                            }
                        })()}
                </Card.Body>
                <ProgressAnimation show={showProgress}/>
            </Card>
        </div>
    )
}

export default FormAccount;