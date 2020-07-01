import InitPage from '../components/InitPage';
import ListAccountAsoc from '../components/ListAccountAsoc';
import {API_BASE_URL} from '../config'
import Router from 'next/router';
import AlertConfirm from '../components/AlertConfirm';
import { useState } from 'react';
import ProgressAnimation from '../components/ProgressAnimation';
import {methodRequet} from '../utils/index'

const Account = (props)=>{
    console.log(props);
    const [showProgress, setShowProgress] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [AccountId,setAccountId] = useState('');

    const deleteUser = async (id_account) =>{
        handleClose();
        setShowProgress(true);
        let idAccount = `/${id_account}`;

        let delAccount= await methodRequet({},'account','DELETE',idAccount);
        if(delAccount){
            alert('Se elimino Correctamente!');
            let dataUrl = {
                actToAct: props.actToAct,
                account: props.id_account
            }
            Router.push({
                pathname: '/account',
                query: dataUrl
            });
        }
        setShowProgress(false);
    }
    const confirmDelete = async (id_account)=> {
        setAccountId(id_account);
        setShow(true);
    }
    return(
        <InitPage>
            <div className="d-flex w-100 d-flex justify-content-start">
                <h1 className="mr-2">Accounts</h1>
                <span className="mt-2">
                    <button onClick={e =>Router.push(`/account_cr?account=${props.id_account}`)} type="button" className="btn btn-outline-success">
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                    </button>
                </span>
            </div>
            <ProgressAnimation show={showProgress}/>
            <ListAccountAsoc actToAct={props.actToAct} confirmDelete={confirmDelete} id_account={props.id_account}/>
            <AlertConfirm title="Confirmacion de eliminación!" body="Esta seguro de eliminar la cuenta?" methodClose={handleClose} AccountId={AccountId} methodModal={deleteUser} title_button="Delete" show={show} />
        </InitPage>
    )
}

Account.getInitialProps = async (ctx) => {

    const respAccountToAccount = await fetch(`${API_BASE_URL}/accountToAccount/${ctx.query.account}`);
    const dataRespAcToAc = await respAccountToAccount.json();
    return {
        actToAct:dataRespAcToAc,
        id_account: ctx.query.account
    }
}

export default Account;