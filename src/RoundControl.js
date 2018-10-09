import React from 'react';
import './round-control.css';

class RoundControl extends React.Component {
  state = {
    setX: 0,
    mouseDown: false,
    knobPosition: 0,
    positionHold: 0
  };
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseMove = e => {
    if (!this.state.mouseDown) {
      return;
    }
    window.addEventListener('mouseup', this.handleMouseUp);
    let knob = document.querySelector('.round-control');
    let pointer = document.querySelector('.round-pointer');
    let knobValue = -e.clientY - this.state.setX + this.state.knobPosition;
    if (knobValue > 270) {
      knobValue = 270;
    }
    if (knobValue < 0) {
      knobValue = 0;
    }
    knob.style.transform = `rotate(${knobValue}deg)`;
    pointer.style.transform = `rotate(-${knobValue}deg)`;
    this.setState({ positionHold: knobValue });
    console.log(knobValue);
  };
  handleMouseDown = e => {
    e.preventDefault();
    this.setState({ setX: -e.clientY, mouseDown: true });
    console.log(this.state);
  };
  handleMouseUp = () => {
    const { positionHold } = this.state;
    this.setState({ mouseDown: false, knobPosition: positionHold });
  };
  render() {
    return (
      <div>
        <div className="outer-ring">
          <div className="round-ring">
            <div className="round-container">
              <div className="round-control" onMouseDown={this.handleMouseDown}>
                <div className="round-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoundControl;
