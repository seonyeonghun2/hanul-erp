import { useState } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
function ModifyExmployee({editEmployee, setIsModalShow}) {
  // console.log(editEmployee);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    _id: editEmployee._id,
    id: editEmployee.employee_id,
    firstname: editEmployee.first_name,
    lastname: editEmployee.last_name,
    hiredate: editEmployee.hire_date
  })
  const modalStyle = {
    display: 'block',
    position: 'fixed',
    zIndex: 999,
  };
  const handleModalClose = () => {
    setIsModalShow(false);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    updateEmployee();
  };
  const updateEmployee = async () => {
    await axios
      .put(`/employees/${formData._id}`, {
        employee_id: formData.id,
        first_name: formData.firstname,
        last_name: formData.lastname,
        hire_date: formData.hiredate,
      })
      .then(function (response) {
        if (response.data.matchedCount === 1) {
          alert("업데이트 성공! 목록 페이지로 이동합니다");
          location.href='/list'
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="modal show" style={modalStyle}>
      <Modal.Dialog fullscreen={true}>
        <Modal.Header closeButton onClick={handleModalClose}>
          <Modal.Title>사원정보 수정</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="EmpId">
              <Form.Label>사번</Form.Label>
              <Form.Control type="number" placeholder="사번을 입력하세요" onChange={handleChange} name="id" defaultValue={formData.id} disabled required/>
              <Form.Text className="text-muted">
                추후 사번은 자동 생성되어 부여될 예정입니다.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmpFirstName">
              <Form.Label>성</Form.Label>
              <Form.Control type="text" placeholder="성 을 입력하세요" onChange={handleChange} name="firstname" defaultValue={formData.firstname} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmpLastName">
              <Form.Label>이름</Form.Label>
              <Form.Control type="text" placeholder="이름을 입력하세요" onChange={handleChange} name="lastname" defaultValue={formData.lastname} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EmpHireDate">
              <Form.Label>입사일</Form.Label>
              <Form.Control type="date" placeholder="입사일을 선택하세요" onChange={handleChange} name="hiredate" defaultValue={formData.hiredate} required />
              <Form.Text className="text-muted">
                입사일을 선택하지 않으면, 등록일 기준으로 저장됩니다.
              </Form.Text>
            </Form.Group>
            <Button type="submit">등록</Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>닫기</Button>
          <Button variant="primary">임시저장</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModifyExmployee;
