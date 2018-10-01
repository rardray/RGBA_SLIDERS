import React, { Component } from 'react';
import './App.css';
import ScaleController from './ScaleController';
import Vcontroll  from './Vcontroll';
import Box from './Box'

class App extends Component {
  state = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
  setR = (value) => {
    this.setState({r: value})
  }
  setG = (value) => {
    this.setState({g: value})
  }
  setB = (value) => {
    this.setState({b: value})
  }
  setA = (value) => {
    const newValue = value * .00392157
    this.setState({a: newValue})
  }
  render() {
    return (
      <div className="App">
        <div style = {{display: 'inline-block', verticalAlign: 'middle'}}>
          <div className = 'Slider-container'>
            <span>Red</span>
              <Vcontroll 
                  setPosition = {this.setR} 
                  thumb = 'thumb-r' 
                  slider = 'slider-r' 
                  value = {this.state.r} 
                  color = {`rgb(${this.state.r}, 0, 0)`}/>
              <span>{this.state.r}</span>
            </div><br/>
          <div className = 'Slider-container'>
            <span>Green</span>
              <Vcontroll 
                  setPosition = {this.setG} 
                  thumb = 'thumb-g' 
                  slider = 'slider-g' 
                  value = {this.state.g}
                  color = {`rgb(0, ${this.state.g}, 0)`}/>
              <span>{this.state.g}</span>
            </div><br/>
          <div className = 'Slider-container'>
            <span>Blue</span>
              <Vcontroll 
                  setPosition = {this.setB} 
                  thumb = 'thumb-b' 
                  slider = 'slider-b' 
                  value = {this.state.b + 4}
                  color = {`rgb(0, 0, ${this.state.b})`}/>
                <span>{this.state.b}</span>
            </div><br/>
          <div className = 'Slider-container'>
            <span>Alpha</span>
              <Vcontroll setPosition = {this.setA} thumb = 'thumb-a' slider = 'slider-a' value = {Math.floor(this.state.a * 100) * 2.55 + 4} color = {`rgba(0,0,0,` + this.state.a + ')'}/>
                <span>{Math.floor(this.state.a * 100)}%</span>
            </div>
            </div>
            <Box r = {this.state.r} g = {this.state.g} b = {this.state.b} a = {this.state.a} height = {200}/>
            <Box r = {this.state.r} g = {0} b = {0} a = {1} height = {100}/>
            <Box r = {0} g = {this.state.g} b = {0} a = {1} height = {100}/>
            <Box r = {0} g = {0} b = {this.state.b} a = {1} height = {100}/>
            <Box r = {0} g = {0} b = {0} a = {this.state.a} height = {100}/>
      </div>
    );
  }
}

export default App;
