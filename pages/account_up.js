import InitPage from '../components/InitPage';
import FormAccount from '../components/FormAccount';
import {API_BASE_URL} from '../config';
import dataInit from '../data/account.json'

const AccountUP = (props) =>{
    const { data, errors } = dataInit;
    const newData = Object.values(data);
    const dataDbUser = props.dataAccount[0];
    for (let index = 0; index < newData.length; index++) {
        if(dataDbUser[newData[index]['var']]){
            newData[index]['value'] = dataDbUser[newData[index]['var']];
        }else if(newData[index]['var']=='type_document'){
            newData[2]['value'] = dataDbUser['id_type_document'];
        }else if(newData[index]['var']=='bank'){
            newData[4]['value'] = dataDbUser['banks'];
        }else if(newData[index]['var']=='name_cart_holder'){
            newData[1]['value'] = dataDbUser['name_cardholder'];
        }
    }
    let reOrganizeData = {};
    for (let j = 0; j < newData.length; j++) {
        reOrganizeData[newData[j]['var']] = newData[j];
    }
    let dataInitNew = {};
    dataInitNew['data'] = reOrganizeData;
    dataInitNew['errors'] = errors;
    return (
        <InitPage>
            <FormAccount
                type_document={props.type_document}
                bank={props.bank}
                type_account={props.type_account}
                id_account={props.id_account}
                accountData={dataInitNew}
            />
        </InitPage>
    )
}
AccountUP.getInitialProps = async (ctx) => {
    const response = await fetch(`${API_BASE_URL}/type_document`);
    const dataResp = await response.json();

    const respoBank = await fetch(`${API_BASE_URL}/bank`);
    const dataBank = await respoBank.json();

    const respoTypeAccount = await fetch(`${API_BASE_URL}/type_account`);
    const dataTypeAccount = await respoTypeAccount.json();

    const respoAccount = await fetch(`${API_BASE_URL}/account/${ctx.query.account_association}`);
    const dataAccount = await respoAccount.json();

    return {
        type_document:dataResp.data,
        bank:dataBank,
        type_account:dataTypeAccount.data,
        id_account:ctx.query.account,
        account_association:ctx.query.account_association,
        dataAccount: dataAccount.data
    }
}
export default AccountUP;