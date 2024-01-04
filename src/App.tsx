import './App.css';
import React, { useState } from 'react';
import Buttons from './components/Buttons.jsx';
import './components/Buttons.css';
import { Container, Row, Col } from 'react-bootstrap';
import ControlPanel from './components/ControlPanel.jsx';

function App() {
  const [soundLevel, setSoundLevel] = useState(50);
  const [powerState, setPowerState] = useState(false);

  const handlePowerToggle = () => {
    setPowerState(prevState => !prevState); // Toggle the power state
    
  };

  return (
    <Container className="bg-success-subtle g-0 bg1 d-flex align-items-center">
      <Row className="g-0 m-0">
        <Col xs={8}>
          <Buttons soundLevel={soundLevel} powerState={powerState}/>
        </Col>
        <Col xs={4}>
          <ControlPanel 
          soundLevel={soundLevel} 
          setSoundLevel={setSoundLevel} 
          onPowerToggle={handlePowerToggle}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
