import InitPage from '../components/InitPage';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {API_BASE_URL} from '../config';
import Router from 'next/router';


const Index = (props) => {
  const goToMenuPrincipal = (data) =>{
    Router.push({
      pathname: '/menuAtm',
      query: data,
    })
  }
  return (
      <InitPage>
        <Container className="pt-5">
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <h1 className="title">Inserte la tarjeta, por favor!</h1>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
                <div className="clikMe" onClick={()=>goToMenuPrincipal(props.accountRandom)}>
                  <span>Cliqueame, Por favor!</span>
                  <Image src="/static/insert_cart.jpg" alt="insert cart" roundedCircle />
                </div>
            </Col>
          </Row>
        </Container>
      </InitPage>
  );
}

Index.getInitialProps = async (ctx) => {
  const response = await fetch(`${API_BASE_URL}/accountRandom`);
  const dataResp = await response.json();
  return {accountRandom:dataResp}
}
export default Index;