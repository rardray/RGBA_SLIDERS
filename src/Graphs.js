import React from 'react';
import './round-control.css';

const Graphs = props => {
  const gradient = () => {
    return Math.round(props.height * 0.94444);
  };
  const reduceRed = () => {
    if (props.height >= 180) {
      return Math.round(255 - props.height);
    } else {
      return 255;
    }
  };
  const style = {
    height: props.height,
    background: `linear-gradient(to top, rgb(10 255 0), rgb(${gradient()} ${reduceRed()} 0 ))`
  };
  return (
    <div>
      <div id="top-grid" />
      <div id="parent">
        <div className="graphs" style={style} />
      </div>
    </div>
  );
};

export default Graphs;
