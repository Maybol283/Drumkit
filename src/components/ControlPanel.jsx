import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';


class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localSoundLevel: props.soundLevel, // Initialize with prop value

        };
    }
   
    handleSliderChange = (event) => {
      const newLevel = event.target.value;
      this.setState({ localSoundLevel: newLevel }); // Update local state
      this.props.setSoundLevel(newLevel); // Update parent state
  }

   handlePowerToggle = () => {
     this.props.onPowerToggle(); // Call the function passed as a prop
 }
    
    render() { 
      
      const { localSoundLevel } = this.state;

        return ( 
            <Container className="my-3" >
             <Form className="py-3">
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Power"
                className="d-inline-start"
                onChange={this.handlePowerToggle}
                       />
             </Form>
            <Form.Label className='py-3 volumeWidth' style={{ width: '50px' }}>Volume: {localSoundLevel}</Form.Label>
              <Form.Range 
              value={localSoundLevel}
              onChange={this.handleSliderChange}
              type="range"
              />
            </Container>
         );
    }
}
 
export default ControlPanel;