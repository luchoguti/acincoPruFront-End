import { Modal,ProgressBar } from 'react-bootstrap';

const ProgressAnimation = (props) =>{
    return (
            <Modal
                show={props.show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <ProgressBar animated now={100} />
                </Modal.Body>
            </Modal>
    )
}

export default ProgressAnimation;