import React from 'react';
import './App.css';

const VolumeIndicator = props => {
  return (
    <div style={{ display: 'inline-block' }}>
      <div
        className="volume-bar"
        id={props.volume > 0.15 ? 'one-active' : 'one'}
      />
      <div
        className="volume-bar"
        id={props.volume > 0.4 ? 'two-active' : 'two'}
      />
      <div
        className="volume-bar"
        id={props.volume > 0.65 ? 'three-active' : 'three'}
      />
      <div
        className="volume-bar"
        id={props.volume > 0.9 ? 'four-active' : 'four'}
      />
    </div>
  );
};

export default VolumeIndicator;
