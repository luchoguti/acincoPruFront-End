import InitPage from '../components/InitPage';
import FormTrasaction from '../components/FormTransaction';
import {API_BASE_URL} from '../config';
import fetch from 'isomorphic-fetch';
import dataMenu from '../data/menu.json';

const Transference = (props) => {
    return (
        <InitPage>
            <FormTrasaction 
                banks={props.banks} 
                actToAct={props.actToAct} 
                nameTrans={props.nameTransac} 
                number_account={props.number_account}
                name_bank={props.name_bank}
                id_account={props.id_account}
                atm={props.atm}
                optTypeTrans={props.optTypeTrans}
                id_banks={props.id_banks}
            />
        </InitPage>
    )
}
Transference.getInitialProps = async (ctx) => {
 
    const response = await fetch(`${API_BASE_URL}/bank`);
    const dataResp = await response.json();

    const respAccountToAccount = await fetch(`${API_BASE_URL}/accountToAccount/${ctx.query.account}`);
    const dataRespAcToAc = await respAccountToAccount.json();
    const nameTra = dataMenu.data[ctx.query.optionTrasaction].name_menu;
    return {
        banks:dataResp,
        actToAct:dataRespAcToAc,
        nameTransac:nameTra,
        id_account:ctx.query.account,
        number_account:ctx.query.number_account,
        name_bank:ctx.query.name_bank,
        atm:ctx.query.atm,
        optTypeTrans: ctx.query.optTypeTrans,
        id_banks:ctx.query.id_banks
    }
}
export default Transference;