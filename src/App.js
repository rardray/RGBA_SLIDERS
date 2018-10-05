import React, { Component } from 'react';
import './App.css';
import Vcontroll from './Vcontroll';
import Box from './Box';
import VolumeIndicator from './Volume-indicator';
import $ from 'jquery';

class App extends Component {
  state = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    volume: 0,
    toggleMenu: false
  };
  setR = value => {
    this.setState({ r: value });
  };
  setG = value => {
    this.setState({ g: value });
  };
  setB = value => {
    this.setState({ b: value });
  };
  setA = value => {
    const newValue = value * 0.00392157;
    this.setState({ a: newValue });
  };
  setVolume = value => {
    const newValue = value * 0.00392157;
    this.setState({ volume: newValue });
  };
  showMenu = e => {
    e.preventDefault();
    setTimeout(() => {
      this.setState({ toggleMenu: !this.state.toggleMenu });
    }, 300);
  };
  volumeClick = e => {
    const setVolume = volume => {
      let newPos = 260 * volume - 7;
      let thumb = document.querySelector('.thumb-v');
      thumb.style.left = newPos + 'px';
      console.log(newPos);
      this.setState({ volume: volume });
    };
    if (e.target.id === 'one' || e.target.id === 'one-active') {
      setVolume(0.25);
    }
    if (e.target.id === 'two' || e.target.id === 'two-active') {
      setVolume(0.5);
    }
    if (e.target.id === 'three' || e.target.id === 'three-active') {
      setVolume(0.75);
    }
    if (e.target.id === 'four' || e.target.id === 'four-active') {
      setVolume(1);
    }
  };

  cancelBar = e => {
    e.preventDefault();
    if (this.state.toggleMenu) {
      this.setState({ toggleMenu: !this.state.toggleMenu });
    }
  };
  render() {
    return (
      <div className="App">
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <div className="Slider-container">
            <span>Red</span>
            <Vcontroll
              setPosition={this.setR}
              thumb="thumb-r"
              slider="slider-r"
              value={this.state.r}
              color={`rgb(${this.state.r}, 0, 0)`}
            />
            <span>{this.state.r}</span>
          </div>
          <br />
          <div className="Slider-container">
            <span>Green</span>
            <Vcontroll
              setPosition={this.setG}
              thumb="thumb-g"
              slider="slider-g"
              value={this.state.g}
              color={`rgb(0, ${this.state.g}, 0)`}
            />
            <span>{this.state.g}</span>
          </div>
          <br />
          <div className="Slider-container">
            <span>Blue</span>
            <Vcontroll
              setPosition={this.setB}
              thumb="thumb-b"
              slider="slider-b"
              value={this.state.b + 4}
              color={`rgb(0, 0, ${this.state.b})`}
            />
            <span>{this.state.b}</span>
          </div>
          <br />
          <div className="Slider-container">
            <span>Alpha</span>
            <Vcontroll
              setPosition={this.setA}
              thumb="thumb-a"
              slider="slider-a"
              value={Math.floor(this.state.a * 100) * 2.55 + 4}
              color={`rgba(0,0,0,` + this.state.a + ')'}
            />
            <span>{Math.floor(this.state.a * 100)}%</span>
          </div>
          <br />
          <br />
          <br /> <br />
          <div style={{ display: 'inline-block' }}>
            <VolumeIndicator
              handleClick={this.volumeClick}
              volume={this.state.volume}
            />
            <span>{Math.floor(this.state.volume * 100)}%</span>
            <div className="expanding-box" onClick={this.showMenu}>
              <div
                className={this.state.toggleMenu ? 'arrow-expanded' : 'arrow'}
              />
              <div
                className={
                  this.state.toggleMenu ? 'show-control' : 'hidden-control'
                }
              >
                <Vcontroll
                  setPosition={this.setVolume}
                  thumb="thumb-v"
                  slider="slider-v"
                  value={Math.floor(this.state.volume * 100) * 2.55 + 4}
                  color={'darkred'}
                />
              </div>
            </div>
          </div>
        </div>
        <Box
          r={this.state.r}
          g={this.state.g}
          b={this.state.b}
          a={this.state.a}
          height={200}
        />
        <Box r={this.state.r} g={0} b={0} a={1} height={100} />
        <Box r={0} g={this.state.g} b={0} a={1} height={100} />
        <Box r={0} g={0} b={this.state.b} a={1} height={100} />
        <Box r={0} g={0} b={0} a={this.state.a} height={100} />
        <div
          style={{ height: $(window).height(), width: $(window).width() }}
          onClick={this.cancelBar}
        />
      </div>
    );
  }
}

export default App;
