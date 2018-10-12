import React from 'react';
import './StyleSheets/round-control.css';

const Graphs = props => {
  const gradient = () => {
    return Math.round(props.height * 0.94444);
  };
  const reduceRed = () => {
    if (props.height >= 207) {
      return Math.round(255 - props.height);
    } else {
      return Math.round(255 - props.height * 0.25);
    }
  };
  const style = {
    height: props.height,
    background: `linear-gradient(to top, rgb(10 255 0), rgb(${gradient()} ${reduceRed()} 0 ))`
  };
  let items = [];
  for (let i = 0; i < Math.round(270 / 45); i++) {
    items[i] = (
      <div id="grid-blocks-inner">
        <div className="grid-blocks">
          <div
            style={{
              width: '40%',
              margin: 6,
              height: 6,
              background: 'white',
              borderRadius: '50%',
              opacity: 0.3,
              boxShadow: '1px 1px 6px white',
              transform: 'rotate(-35deg)'
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div id="top-grid" />
      <div id="parent">
        <div className="grid-blocks-back" />
        <div className="grid-blocks-container">{items}</div>
        <div className="graphs" style={style} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p>
          {-20 + Math.round(props.height * 0.0962963)}
          db
        </p>
      </div>
    </div>
  );
};

export default Graphs;
