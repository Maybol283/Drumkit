import React, { Component, RefObject } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./Buttons.css";

type AudioButtonProps = {
    label: string;
    src: string;
    soundLevel: number;
    powerState: boolean;
};

type AudioButtonState = {
    isActive: boolean;
};

class AudioButton extends Component <AudioButtonProps, AudioButtonState> {
    audioRef: RefObject<HTMLAudioElement> = React.createRef();
    state = { isActive: false};
    constructor(props: AudioButtonProps) {
        super(props);
        this.state = { isActive: false };
    }
    
    playSound = () => {
        if(!this.props.powerState) return;
        const audio = this.audioRef.current;
        if (audio){
        audio.currentTime = 0;  // Reset the audio playback to the beginning
        audio.play();  // Start the audio playback
        audio.volume = (this.props.soundLevel/100);
    }
    }

    setActive = (isActive: boolean) => {
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

type ButtonsProps = {
    soundLevel: number;
    powerState: boolean;
};

class Buttons extends Component <ButtonsProps>{
    buttonRefs: { [key: string]: AudioButton | null } = {};

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown = (event:any) => {
        const key = event.key.toUpperCase();
        const audioButton = this.buttonRefs[key];
        if (audioButton) {
            audioButton.playSound();
            audioButton.setActive(true);
        }
    }

    handleKeyUp = (event:any) => {
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
        <Container >
            {rows.map((row, rowIndex) => (
                <Row className="g-0 pt-1" key={rowIndex}>
                    {row.map(i => (
                        <AudioButton
                        key={i}
                        ref={(ref) => { this.buttonRefs[audioSRC[i].label] = ref; }}
                        soundLevel={this.props.soundLevel}
                        {...audioSRC[i]}
                        powerState={this.props.powerState}
                    />
                    ))}
                </Row>
            ))}
        </Container>
    );
}
}
export default Buttons;