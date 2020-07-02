
import { useState } from 'react';
import InitPage from '../components/InitPage';
import { Container, Alert, ListGroup } from 'react-bootstrap';
import DataMenu from '../data/menu.json';
import {useRouter} from 'next/router';
import Router from 'next/router';
import {methodRequet} from '../utils/index';
import ProgressAnimation from '../components/ProgressAnimation';
import {API_BASE_URL} from '../config'


const MenuPrincipal = (props) =>{
    const router = useRouter();
    const account = router.query;
    const [showProgress, setShowProgress] = useState(false);

    const goToWithdrawals = async ()=>{
        setShowProgress(true);
        let queryData = {
            'account': account.id_accounts,
            'atm': props.atm.id_atm
        }
        Router.push({
            pathname: '/withDrawal',
            query: queryData,
        });        
    }
    const goToTransaction = (option,optTypeTrans)=>{
        setShowProgress(true);
        let queryData = {
            'id_accounts': account.id_accounts,
            'number_account': account.number_account,
            'name_bank': account.name_bank,
            'id_banks': account.id_banks,
            'optionTrasaction': option,
            'atm': props.atm.id_atm,
            'optTypeTrans': optTypeTrans
        }
        return queryData;
    }
    const goToEvent = (optionEvent) =>{
        switch (optionEvent) {
            case 1:
                goToWithdrawals();
            break;
            case 2:
                var queryData=goToTransaction(1,2);
                Router.push({
                    pathname: '/consignation',
                    query: queryData,
                });
            break;
            case 3:
                var queryData=goToTransaction(2,3);
                Router.push({
                    pathname: '/transference',
                    query: queryData,
                });
            break;
            case 4:
                var queryData=goToTransaction(3,4);
                Router.push({
                    pathname: '/donation',
                    query: queryData,
                });
            break;
            case 5:
                var queryData=goToTransaction(4,5);
                Router.push({
                    pathname: '/statusAccount',
                    query: queryData,
                });
            break;
            default:
                var queryData=goToTransaction(5,6);
                Router.push({
                    pathname: '/account',
                    query: queryData,
                });
            break;
        }
    }
    return (
        <InitPage>
            <Container>
                <Alert variant="dark">
                    <h4>Cuenta #{account.number_account}#</h4>
                </Alert>
            </Container>
            <Container className="p-1">
                <ListGroup className="list-group-flush">
                    {
                        DataMenu.data.map((optMenu,keyOption)=>(
                            <ListGroup.Item action className="list-group-item-action d-flex justify-content-center" key={keyOption} onClick={() => goToEvent(optMenu.event)}>
                                <h2 className="pr-4">{optMenu.name_menu}</h2>
                                <h2><i className={optMenu.icon} aria-hidden="true"></i></h2>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Container>
            <ProgressAnimation show={showProgress}/>
        </InitPage>
    )
}
MenuPrincipal.getInitialProps = async (ctx) => {
    const response = await fetch(`${API_BASE_URL}/atmRandom`);
    const dataResp = await response.json();
    return {
        atm:dataResp
    }
}
export default MenuPrincipal;