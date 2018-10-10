import React from 'react';
import './StyleSheets/round-control.css';

class RoundControl extends React.Component {
  state = {
    setX: 0,
    mouseDown: false,
    knobPosition: 0
  };
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseMove = e => {
    if (!this.state.mouseDown) {
      return;
    }
    window.addEventListener('mouseup', this.handleMouseUp);
    let knob = document.querySelector(`.${this.props.control}`);
    let pointer = document.querySelector(`.${this.props.pointer}`);
    let knobValue = -e.clientY - this.state.setX + this.state.knobPosition;
    if (knobValue > 270) {
      knobValue = 270;
    }
    if (knobValue < 0) {
      knobValue = 0;
    }
    knob.style.transform = `rotate(${knobValue}deg)`;
    pointer.style.transform = `rotate(-${knobValue}deg)`;
    this.props.roundControl(knobValue);
    console.log(knobValue);
  };
  handleMouseDown = e => {
    e.preventDefault();
    this.setState({ setX: -e.clientY, mouseDown: true });
    console.log(this.state);
  };
  handleMouseUp = () => {
    this.setState({ mouseDown: false, knobPosition: this.props.roundKnob });
  };
  render() {
    return (
      <div>
        <div className="outer-ring">
          <div className="round-ring">
            <div className="round-container">
              <div
                className={this.props.control}
                onMouseDown={this.handleMouseDown}
              >
                <div className={this.props.pointer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoundControl;
