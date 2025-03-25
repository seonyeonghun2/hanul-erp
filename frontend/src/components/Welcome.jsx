import React from 'react'
import landingImg from '../assets/landing.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';
function Welcome() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>사원관리 시스템</h1>
          <img src={landingImg} alt="landing image" />
        </Col>
      </Row>
    </Container>
  )
}

export default Welcome