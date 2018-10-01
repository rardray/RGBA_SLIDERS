import React from 'react';



const Box = (props) => {
    const {r, g, b, a, height } = props
    const style = {
        height: height,
        width: height,
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
        display: 'inline-block',
        top: 0,
        borderRadius: '50%',
        verticalAlign: 'middle',
        margin: 10
    }
    return (
        <div style = {style}>
            </div>
    )
}

export default Box