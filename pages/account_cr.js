import InitPage from '../components/InitPage';
import FormAccount from '../components/FormAccount';
import {API_BASE_URL} from '../config';
import accountData from '../data/account.json'

const AccountCR = (props) =>{
    return (
        <InitPage>
            <FormAccount
                type_document={props.type_document}
                bank={props.bank}
                type_account={props.type_account}
                id_account={props.id_account}
                accountData={accountData}
            />
        </InitPage>
    )
}
AccountCR.getInitialProps = async (ctx) => {
    const response = await fetch(`${API_BASE_URL}/type_document`);
    const dataResp = await response.json();

    const respoBank = await fetch(`${API_BASE_URL}/bank`);
    const dataBank = await respoBank.json();

    const respoTypeAccount = await fetch(`${API_BASE_URL}/type_account`);
    const dataTypeAccount = await respoTypeAccount.json();

    return {
        type_document:dataResp.data,
        bank:dataBank,
        type_account:dataTypeAccount.data,
        id_account:ctx.query.account
    }
}
export default AccountCR;