import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import ModifyEmployee from '../components/ModifyEmployee';

function ListEmployees() {
  const [employees, setEmployees] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null)
  const getEmployees = async () => {
    const data = await axios.get('https://hanul-erp-backend.vercel.app/api/employees');
    // fetch() : json parse 직접 ==> response.json() 호출
    // axios() : json 자동으로 parse ==> state에 바로 담으면 됨
    console.log(data);
    setEmployees(data.data); // setEmployees(data)
  };
  useEffect(() => {
    getEmployees();
  }, []);
  const handleEdit = (e) => {
    setEditEmployee(employees[e.target.dataset.id])
    setIsModalShow((prevState) => !prevState);
  };
  const handleDelete = async (e) => {
    const targetId = e.currentTarget.dataset.empId;
    if (confirm('정말로, 삭제하시겠습니까?')) {
      await axios
        .delete(`/api/employees/${targetId}`)
        .then((response) => console.log(response))
        .catch((e) => console.log(e));
    }
    getEmployees();
  };
  return (
    <>
      {isModalShow && <ModifyEmployee editEmployee={editEmployee} setIsModalShow={setIsModalShow} />}
      <Container>
        <Row>
          <Col>
            <h1 className="text-center my-3">사원목록</h1>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="text-center">사번</th>
                  <th className="text-center">이름</th>
                  <th className="text-center">이메일</th>
                  <th className="text-center">전화번호</th>
                  <th className="text-center">업무코드</th>
                  <th className="text-center">입사일</th>
                  <th className="text-center">급여</th>
                  <th className="text-center">커미션율</th>
                  <th className="text-center">매니저</th>
                  <th className="text-center">부서</th>
                  <th className="text-center">관리</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <tr key={emp._id}>
                    <td className="text-center">{emp.employee_id}</td>
                    <td className="text-center">
                      {emp.first_name} {emp.last_name}
                    </td>
                    <td className="text-center">{emp.email}</td>
                    <td className="text-center">{emp.phone_number}</td>
                    <td className="text-center">{emp.job_id}</td>
                    <td className="text-center">{new Date(emp.hire_date).toLocaleDateString()}</td>
                    <td className="text-center">{emp.salary}</td>
                    <td className="text-center">{emp.commission_pct ? emp.commission_pct : '-'}</td>
                    <td className="text-center">{emp.manager_id ? emp.manager_id : '-'}</td>
                    <td className="text-center">
                      {emp.department_id == 90 ? '경영부서' : emp.salary}
                    </td>
                    <td className="d-flex gap-1 justify-content-center">
                      {/* 수정 버튼 클릭시 employees에서 특정 employee를 필터링해서 Modal 컴포넌트에 props로 전달*/}
                      <Button onClick={handleEdit} data-id={i}>수정</Button>
                      <Button className="btn-danger" onClick={handleDelete} data-emp-id={emp._id}>
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListEmployees;
