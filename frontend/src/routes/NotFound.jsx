import React from 'react';
import ErrorScreen from '../assets/error.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';
function NotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <div className='mx-auto' style={{width: 752}}><img src={ErrorScreen} alt="error" /></div>
          <p className='text-center'>404 NotFound | 페이지를 찾을수 없습니다.</p>
          <p>NotFound는 /signup, /board 처럼 사용자가 직접 URL을 타이핑해서 접속할 경우를 대비해,
            제공하지 않는 페이지 라우팅 URL 접근은 에러처리 하는 목적!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
