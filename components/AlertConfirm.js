import { Modal , Button } from 'react-bootstrap';

const AlertConfirm = (props) => {
    return (
            <Modal
                show={props.show}
                onHide={props.methodClose}
                backdrop="static"
                keyboard={false}
            > 
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.body}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.methodClose}>Close</Button>
                    <Button variant="primary" onClick={()=> props.methodModal(props.AccountId)}>{props.title_button}</Button>
                </Modal.Footer>
            </Modal>
    )
}

export default AlertConfirm;