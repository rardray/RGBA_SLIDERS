import React from 'react';
import './Vcontroll.css'

class Vcontroll extends React.Component {
    state = {
        shiftX: null,
        mouseDown: false,

    }
 
    handleMouseDown = e => {
        e.preventDefault()
        let thumb = document.querySelector(`.${this.props.thumb}`) 
        console.log(thumb.getBoundingClientRect().left)
        console.log(e.clientX)
        //event client x is mouse position  : calculation takes mouse position on click and subtracts it from thumb left position (boundingClientRect left)
        this.setState({shiftX: e.clientX - thumb.getBoundingClientRect().left, mouseDown: true}, () => console.log(this.state))
    }
    handleMouseMove = e => {
        if (!this.state.mouseDown) {return;}
        let slider = document.querySelector(`.${this.props.slider}`);
        window.addEventListener('mouseup', this.handleMouseUp)
        // new left takes mouse position subtracts thumb offset then subtracts the sliders left position EX: clientx 60 - shift x 9 = 51 then slider is 40 from left so 51 - 40 = 11... this offsets thumb 11 from slider left
        console.log(e.clientX)
        console.log(this.state.shiftX)
        console.log(slider.getBoundingClientRect().left)
        let newLeft = e.clientX - this.state.shiftX - slider.getBoundingClientRect().left
        //if statements set the shift to edges fo slider if mouse x exceeds borders of slider
        if (newLeft < 0){
            newLeft = 0;
            
        }
        let rightEdge = slider.offsetWidth - document.querySelector(`.${this.props.thumb}`).offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        document.querySelector(`.${this.props.thumb}`).style.left = newLeft + 'px';
        this.props.setPosition(newLeft)

    }
    handleMouseUp = () => {
        this.setState({mouseDown: false})
        window.removeEventListener('mouseup', this.handleMouseUp)
    }
    handleDrag = () => {return false; }
    render() {
    return (
        <div onMouseMove = {this.handleMouseMove} style = {{display: 'inline-block'}}
            onMouseUp = {this.handleMouseUp} >
           <div id = 'slider' className = {this.props.slider} >
              <div className = {this.props.thumb} 
                onMouseDown = {this.handleMouseDown} 
                onDragStart = {this.handleDrag}>

              </div>
            </div>
         </div>
        )
    }   
}
export default Vcontroll;