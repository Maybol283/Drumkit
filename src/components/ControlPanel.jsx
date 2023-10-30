import React, { Component } from 'react';
import { Container, Form } from 'react-bootstrap';


class ControlPanel extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    
    render() { 
       
        return ( 
            <Container fluid className="my-3">
             <Form className="py-3">
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Power"
                className="d-inline-start"
                
                       />
             </Form>
            <Form.Label className='py-3'>Volume:</Form.Label>
              <Form.Range />
            </Container>
         );
    }
}
 
export default ControlPanel;