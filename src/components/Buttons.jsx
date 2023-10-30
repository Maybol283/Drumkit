import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./Buttons.css";

class AudioButton extends Component {
    audioRef = React.createRef();
    state = { isActive: false };

    playSound = () => {
        const audio = this.audioRef.current;
        audio.currentTime = 0;  // Reset the audio playback to the beginning
        audio.play();  // Start the audio playback
    }

    setActive = (isActive) => {
        this.setState({ isActive });
    }

    render() {
        const { label, src } = this.props;
        const buttonClass = this.state.isActive ? 'grid-item active' : 'grid-item';
        return (
                <Col xs={4}>
                <Button className={buttonClass} onClick={this.playSound}>
                    {label}
                    <audio ref={this.audioRef} src={src} />
                </Button>
            </Col>
        );
    }
}

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.buttonRefs = {};
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown = (event) => {
        const key = event.key.toUpperCase();
        const audioButton = this.buttonRefs[key];
        if (audioButton) {
            audioButton.playSound();
            audioButton.setActive(true);
        }
    }

    handleKeyUp = (event) => {
        const key = event.key.toUpperCase();
        const audioButton = this.buttonRefs[key];
        if (audioButton) {
            audioButton.setActive(false);
        }
    }
    render()  { 
    const audioSRC = [
        {label: 'Q', src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
        {label: 'W', src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
        {label: 'E', src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        {label: 'A', src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
        {label: 'S', src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
        {label: 'D', src:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
        {label: 'Z', src:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
        {label: 'X', src:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
        {label: 'C', src:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
    ]

    const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    return (
        <Container fluid className="px-2 pe-2">
            {rows.map((row, rowIndex) => (
                <Row key={rowIndex}>
                    {row.map(i => (
                        <AudioButton
                        key={i}
                        ref={(ref) => { this.buttonRefs[audioSRC[i].label] = ref; }}
                        {...audioSRC[i]}
                    />
                    ))}
                </Row>
            ))}
        </Container>
    );
}
}
export default Buttons;