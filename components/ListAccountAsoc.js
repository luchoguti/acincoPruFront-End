import Router from 'next/router';

const ListAccuntAsoc = (props) =>{
    return(
        <div className="list-group">
            {
                props.actToAct.map(accountToAct => (
                    <a key={accountToAct.id_account_to_account} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex justify-content-between">
                            <h5>#{accountToAct.number_account_association}#</h5>
                            <div>
                                <button onClick={e => Router.push(`/account_up?account=${props.id_account}&account_association=${accountToAct.account_association}`)} type="button" className="btn btn-outline-info mr-2">
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="btn btn-outline-danger" onClick={()=>props.confirmDelete(accountToAct.account_association)}>
                                    <i className="fa fa-user-times" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div className="d-flex w-100 justify-content-around">
                            <p>Banco: {accountToAct.name_bank}</p>
                            <p className="">Nombre titular: {accountToAct.name_cardholder_association}</p>
                            <p># Identificación: {accountToAct.number_identification_association}</p>
                        </div>
                    </a>
                ))
            }
        </div>
    )
}

export default ListAccuntAsoc;