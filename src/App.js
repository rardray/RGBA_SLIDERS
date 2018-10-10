import React, { Component } from 'react';
import './App.css';
import Vcontroll from './Vcontroll';
import Box from './Box';
import VolumeIndicator from './Volume-indicator';
import $ from 'jquery';
import RoundControl from './RoundControl';
import Graphs from './Graphs';
class App extends Component {
  state = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    volume: 0,
    roundKnob80: 0,
    roundKnob100: 0,
    roundKnob120: 0,
    roundKnob200: 0,
    toggleMenu: false
  };
  componentDidMount() {
    let storage = localStorage.getItem('settings');
    if (!storage) {
      return;
    }
    this.setState(prevState => {
      return (prevState = JSON.parse(localStorage.getItem('settings')));
    });
  }
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
      let thumb = document.querySelector('.thumb-v');
      let newPos =
        (document.querySelector('.slider-v').getBoundingClientRect().width -
          thumb.getBoundingClientRect().width) *
        volume;

      thumb.style.left = newPos + 'px';
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
  handleSave = e => {
    e.preventDefault();
    localStorage.setItem('settings', JSON.stringify(this.state));
    localStorage.setItem(
      'volume',
      document.querySelector('.thumb-v').getBoundingClientRect().left -
        document.querySelector('.slider-v').getBoundingClientRect().left
    );
    localStorage.setItem(
      'r',
      document.querySelector('.thumb-r').getBoundingClientRect().left -
        document.querySelector('.slider-r').getBoundingClientRect().left
    );
    localStorage.setItem(
      'g',
      document.querySelector('.thumb-g').getBoundingClientRect().left -
        document.querySelector('.slider-g').getBoundingClientRect().left
    );
    localStorage.setItem(
      'b',
      document.querySelector('.thumb-b').getBoundingClientRect().left -
        document.querySelector('.slider-b').getBoundingClientRect().left
    );
    localStorage.setItem(
      'a',
      document.querySelector('.thumb-a').getBoundingClientRect().left -
        document.querySelector('.slider-a').getBoundingClientRect().left
    );
  };
  roundControl80 = value => {
    this.setState({ roundKnob80: value });
  };
  roundControl100 = value => {
    this.setState({ roundKnob100: value });
  };
  roundControl120 = value => {
    this.setState({ roundKnob120: value });
  };
  roundControl200 = value => {
    this.setState({ roundKnob200: value });
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
              ls="r"
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
              ls="g"
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
              ls="b"
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
              ls="a"
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
                  ls="volume"
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
        <button onClick={this.handleSave}>Save Settings</button>
        <br />
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.roundControl80}
            roundKnob={this.state.roundKnob80}
            control="round-control80"
            pointer="round-pointer80"
          />
        </div>
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.roundControl100}
            roundKnob={this.state.roundKnob100}
            control="round-control100"
            pointer="round-pointer100"
          />
        </div>
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.roundControl120}
            roundKnob={this.state.roundKnob120}
            control="round-control120"
            pointer="round-pointer120"
          />
        </div>
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.roundControl200}
            roundKnob={this.state.roundKnob200}
            control="round-control200"
            pointer="round-pointer200"
          />
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'bottom' }}>
          <div
            style={{
              height: 90,
              width: 50,
              borderWidth: 1,
              position: 'relative',
              borderStyle: 'solid',
              borderColor: 'lightgrey',
              borderRight: 'none',
              borderLeft: 'none',
              borderBottom: 'none'
            }}
          />
          <div
            style={{
              height: 180,
              position: 'relative',
              width: 50,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'lightgray',
              borderLeft: 'none',
              borderRight: 'none'
            }}
          />
        </div>
        <div
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            position: 'relative'
          }}
        >
          <Graphs height={this.state.roundKnob80} />
        </div>
        <div
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            position: 'relative'
          }}
        >
          <Graphs height={this.state.roundKnob100} />
        </div>
        <div
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            position: 'relative'
          }}
        >
          <Graphs height={this.state.roundKnob120} />
        </div>
        <div
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            position: 'relative'
          }}
        >
          <Graphs height={this.state.roundKnob200} />
        </div>
        <div
          style={{ height: $(window).height(), width: $(window).width() }}
          onClick={this.cancelBar}
        />
      </div>
    );
  }
}

export default App;
