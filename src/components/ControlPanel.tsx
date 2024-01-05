import { Component, ChangeEvent } from 'react';
import { Container, Form } from 'react-bootstrap';



// Define the prop types
type ControlPanelProps = {
  soundLevel: number;
  setSoundLevel: (level: number) => void;
  onPowerToggle: () => void;
};

// Define the state type
type ControlPanelState = {
  localSoundLevel: number;
};

class ControlPanel extends Component<ControlPanelProps, ControlPanelState>  {
    constructor(props: ControlPanelProps) {
        super(props);
        this.state = {
            localSoundLevel: props.soundLevel, // Initialize with prop value

        };
    }
   
    handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newLevel = parseInt(event.target.value, 10);
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
              />
            </Container>
         );
    }
}
 
export default ControlPanel;