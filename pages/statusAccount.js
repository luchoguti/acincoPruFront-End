

import InitPage from '../components/InitPage';
import Router from 'next/router';
import {API_BASE_URL} from '../config';


const statusAccount = (props) => {
    const regresar = () =>{
        Router.push({
            pathname: '/menuAtm',
            query:props.urlQuery
        });
    }
    return (
        <InitPage>
            <div className="d-flex w-100 d-flex justify-content-start">
                <h1 className="mr-2">Detalle Transacciones </h1>
                <p>Saldo A la fecha : {props.balance.balance}</p>
            </div>
            <div className="list-group">
                {
                    props.trasactionData.map(transaction => (
                        <a key={transaction.id_transaction} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex justify-content-between">
                                <h5>#{transaction.description_type_transaction}#</h5>
                            </div>
                            <div className="d-flex w-100 justify-content-around">
                                <p>Cuenta destino: {transaction.number_account_destination}</p>
                                <p>Valor Transaccion: {transaction.value_transaction}</p>
                            </div>
                        </a>
                    ))
                }
            </div>
            <button onClick={regresar} className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Regresar</button>
        </InitPage>
    );
}

statusAccount.getInitialProps = async (ctx) => {
    const response = await fetch(`${API_BASE_URL}/transactionForAccountOrigin/${ctx.query.id_accounts}`);
    const dataResp = await response.json();

    const respBalance = await fetch(`${API_BASE_URL}/balanceForAccount/${ctx.query.id_accounts}`);
    const dataBalance = await respBalance.json();
    
    return {
        trasactionData:dataResp,
        balance:dataBalance,
        urlQuery:ctx.query
    }
  }

export default statusAccount;