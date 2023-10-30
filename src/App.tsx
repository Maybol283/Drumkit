import './App.css';
import Buttons from './components/Buttons.jsx';
import './components/Buttons.css';
import { Container, Row, Col } from 'react-bootstrap';
import ControlPanel from './components/ControlPanel.jsx';

function App() {
  return (
    <Container fluid className="bg-success-subtle">
      <Row>
        <Col xs={8}>
          <Buttons />
        </Col>
        <Col xs={4}>
          <ControlPanel />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
