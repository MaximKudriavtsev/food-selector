import React, { Component } from "react";
import ReactDOM from "react-dom";

const colors = [
  'black',
  'white',
  'pink',
  'green',
  'brown',
  'red',
  'grey'
];

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      colorId: 0
    };

    this.changeColor = this.changeColor.bind(this);
  }
  changeColor() {
    const { colorId } = this.state;
    const newColorId = (colorId + 1) % colors.length;
    console.log(newColorId);
    this.setState({ colorId: newColorId });
  }
  render() {
    const { colorId } = this.state;
    return (
      <div>
        <h1
          style={{ color: colors[colorId] }}
        >
          Hello Kate!
      </h1>
        <button
          onClick={this.changeColor}
        >
          Choose your favorite color!
      </button>
      </div>
    );
  }
}

export default FormContainer;