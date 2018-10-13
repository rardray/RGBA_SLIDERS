import React, { Component } from 'react';
import './StyleSheets/App.css';
import Vcontroll from './Vcontroll';
import Box from './Box';
import VolumeIndicator from './Volume-indicator';
import $ from 'jquery';
import RoundControl from './RoundControl';
import Graphs from './Graphs';
import './StyleSheets/round-control.css';
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
  setValues = (value, name) => {
    if (name === 'a') {
      const newValue = value * 0.00392157;
      this.setState({ [name]: newValue });
    } else {
      this.setState({ [name]: value });
    }
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
    this.setKnobValues(this.state);
    this.setSliderValues(this.state);
  };
  setKnobValues = value => {
    const knobs = [
      value.roundKnob80,
      value.roundKnob100,
      value.roundKnob120,
      value.roundKnob200
    ];
    for (let i = 0; i < knobs.length; i++) {
      localStorage.setItem(`n${i + 1}`, knobs[i]);
    }
  };
  setSliderValues = value => {
    const rgba = {
      r: this.state.r,
      g: this.state.g,
      b: this.state.b,
      a: this.state.a
    };
    const sliders = Object.keys(rgba);
    for (let i = 0; i < sliders.length; i++) {
      localStorage.setItem(
        `${sliders[i]}`,
        document.querySelector(`.thumb-${sliders[i]}`).getBoundingClientRect()
          .left -
          document
            .querySelector(`.slider-${sliders[i]}`)
            .getBoundingClientRect().left
      );
    }
  };

  render() {
    return (
      <div className="App">
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <div className="Slider-container">
            <span>Red</span>
            <Vcontroll
              setPosition={this.setValue}
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
              setPosition={this.setValue}
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
              setPosition={this.setValue}
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
              setPosition={this.setValue}
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
            <div id="expanding-box" onClick={this.showMenu}>
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
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <div id="grid-label-container">
            <p className="grid-child">+6db</p>
          </div>
          <div id="grid-label-bottom">
            <p className="grid-child">0db</p>
            <p className="grid-child-bottom">-20db</p>
          </div>
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
        <br />
        <div style={{ display: 'inline-block', width: 45 }} />
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.setValues}
            roundKnob={this.state.roundKnob80}
            control="round-control80"
            pointer="round-pointer80"
            l="n1"
            name="roundKnob80"
          />
        </div>
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.setValues}
            roundKnob={this.state.roundKnob100}
            control="round-control100"
            pointer="round-pointer100"
            l="n2"
            name="roundKnob100"
          />
        </div>
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.setValues}
            roundKnob={this.state.roundKnob120}
            control="round-control120"
            pointer="round-pointer120"
            l="n3"
            name="roundKnob120"
          />
        </div>
        <div style={{ display: 'inline-block', margin: 5 }}>
          <RoundControl
            roundControl={this.setValues}
            roundKnob={this.state.roundKnob200}
            control="round-control200"
            pointer="round-pointer200"
            l="n4"
            name="roundKnob200"
          />
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
