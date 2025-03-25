import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function AddEmployee() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    hiredate: ''
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    addEmployee();
  };
  const addEmployee = async () => {
    await axios
      .post('/employees', {
        employee_id: formData.id,
        first_name: formData.firstname,
        last_name: formData.lastname,
        hire_date: formData.hiredate,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-3">사원등록</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="EmpId">
              <Form.Label>사번</Form.Label>
              <Form.Control type="number" placeholder="사번을 입력하세요" onChange={handleChange} name="id" required />
              <Form.Text className="text-muted">
                추후 사번은 자동 생성되어 부여될 예정입니다.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmpFirstName">
              <Form.Label>성</Form.Label>
              <Form.Control type="text" placeholder="성 을 입력하세요" onChange={handleChange} name="firstname" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmpLastName">
              <Form.Label>이름</Form.Label>
              <Form.Control type="text" placeholder="이름을 입력하세요" onChange={handleChange} name="lastname" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmpHireDate">
              <Form.Label>입사일</Form.Label>
              <Form.Control type="date" placeholder="입사일을 선택하세요" onChange={handleChange} name="hiredate" required />
              <Form.Text className="text-muted">
                입사일을 선택하지 않으면, 등록일 기준으로 저장됩니다.
              </Form.Text>
            </Form.Group>
            <Button type="submit">등록</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddEmployee;
