import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router';
import result from '../assets/result.png'
function Home() {
  const navUl = {
    listStyle: 'none',
  };
  return (
    <>
      <header>
        <Container>
          <Row className='py-3'>
            <Col className="col-lg-4">
              <div className="logo fs-3">한울ERP</div>
            </Col>
            <Col className="col-lg-8">
              <nav>
                <ul className="d-flex justify-content-around" style={navUl}>
                  <li>
                    <NavLink to="/home">처음으로</NavLink>
                  </li>
                  <li>
                    <NavLink to="/list">사원목록</NavLink>
                  </li>
                  <li>
                    <NavLink to="/add">사원등록</NavLink>
                  </li>
                  <li>
                    <NavLink to="/news">새소식</NavLink>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      </header>
      <main>
        <Container>
          <Row>
            <Col><img src={result} alt="result" /></Col>
          </Row>
        </Container>
        <Outlet />
      </main>
      <footer>
        <Container>
          <Row>
            <Col>
              <p className='text-center bg-dark text-white py-2'>&copy; 한울ERP</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Home;
