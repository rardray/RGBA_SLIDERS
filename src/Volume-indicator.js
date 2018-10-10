import React from 'react';
import './StyleSheets/App.css';

const VolumeIndicator = props => {
  return (
    <div style={{ display: 'inline-block' }}>
      <div
        className="volume-bar"
        id={props.volume > 0.15 ? 'one-active' : 'one'}
        onClick={props.handleClick}
      />
      <div
        className="volume-bar"
        id={props.volume > 0.4 ? 'two-active' : 'two'}
        onClick={props.handleClick}
      />
      <div
        className="volume-bar"
        id={props.volume > 0.65 ? 'three-active' : 'three'}
        onClick={props.handleClick}
      />
      <div
        className="volume-bar"
        id={props.volume > 0.9 ? 'four-active' : 'four'}
        onClick={props.handleClick}
      />
    </div>
  );
};

export default VolumeIndicator;
