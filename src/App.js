import './App.css';
import FileUpload from './FileUpload';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo_white.svg';

function App() {
  return (
    <>
    <Navbar fixed="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        Guardian
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Returning Student" id="basic-nav-dropdown">
            <NavDropdown.Item href="#student_snapshot">Student Snapshot</NavDropdown.Item>
            <NavDropdown.Item href="#student_details">Student Details</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="New Students" id="basic-nav-dropdown">
            <NavDropdown.Item href="#student_forecast">Student Forecast Table</NavDropdown.Item>
            <NavDropdown.Item href="#new_student_charts">Student Forecast Charts</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Class Data" id="basic-nav-dropdown">
            <NavDropdown.Item href="#class_statistics">Class Statistics</NavDropdown.Item>
            <NavDropdown.Item href="#class_table">Class Data Table</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#tutor_center">Tutor Center</Nav.Link>
          <Nav.Link href="#statistics_summary">Statistics Summary</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <div key='app' className="App">
          <h1 style={{textAlign: 'center'}} key='awefa'>SAVE Guardian Program</h1>
          <FileUpload key="FileUpload"/>
    </div>
    </>
  );
}

export default App;
