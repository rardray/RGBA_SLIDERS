import React from 'react';
import './StyleSheets/Vcontroll.css';

class Vcontroll extends React.Component {
  state = {
    shiftX: null,
    mouseDown: false
  };
  componentDidMount() {
    let storage = localStorage.getItem(`${this.props.le}`);
    let thumb = document.querySelector(`.${this.props.thumb}`);
    if (!storage) {
      return;
    }
    thumb.style.left = localStorage.getItem(this.props.ls) + 'px';
    console.log(thumb.style.left);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseDown = e => {
    e.preventDefault();
    let thumb = document.querySelector(`.${this.props.thumb}`);
    //event client x is mouse position  : calculation takes mouse position on click and subtracts it from thumb left position
    //(boundingClientRect left)
    this.setState(
      {
        shiftX: e.clientX - thumb.getBoundingClientRect().left,
        mouseDown: true
      },
      () => console.log(this.state)
    );
  };
  handleMouseMove = e => {
    if (!this.state.mouseDown) {
      return;
    }
    let slider = document.querySelector(`.${this.props.slider}`);
    window.addEventListener('mouseup', this.handleMouseUp);
    // new left takes mouse position subtracts thumb offset then subtracts the sliders left position
    //EX: clientx 60 - shift x 9 = 51 then slider is 40 from left so 51 - 40 = 11... this offsets thumb 11 from slider left

    let newLeft =
      e.clientX - this.state.shiftX - slider.getBoundingClientRect().left;
    //if statements set the shift to edges fo slider if mouse x exceeds borders of slider
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge =
      slider.offsetWidth -
      document.querySelector(`.${this.props.thumb}`).offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    document.querySelector(`.${this.props.thumb}`).style.left = newLeft + 'px';
    this.props.setPosition(newLeft, this.props.ls);
  };
  handleMouseUp = () => {
    this.setState({ mouseDown: false });
    window.removeEventListener('mouseup', this.handleMouseUp);
  };
  handleClick = e => {
    let slider = document.querySelector(`.${this.props.slider}`);
    let position = e.clientX - 7 - slider.getBoundingClientRect().left;
    if (position < 0) {
      position = 0;
    }
    if (position > 255) {
      position = 255;
    }
    document.querySelector(`.${this.props.thumb}`).style.left = position + 'px';
    this.props.setPosition(position, this.props.ls);
  };
  handleDrag = () => {
    return false;
  };
  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <div
          id="slider"
          className={this.props.slider}
          onClick={this.handleClick}
        >
          <div
            style={{
              backgroundColor: this.props.color,
              height: '100%',
              width: this.props.value,
              borderRadius: 3
            }}
          >
            <div
              className={this.props.thumb}
              onMouseDown={this.handleMouseDown}
              onDragStart={this.handleDrag}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Vcontroll;
