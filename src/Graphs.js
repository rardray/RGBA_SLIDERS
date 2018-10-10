import React from 'react';
import './round-control.css';

const Graphs = props => {
  const style = {
    height: props.height
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
