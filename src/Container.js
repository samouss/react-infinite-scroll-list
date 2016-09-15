import React, { Component } from 'react';

/**
 * @name Container
 */
export default class Container extends Component {

  constructor(props) {
    super(props);

    this.state = { message: '<Container />' };
  }

  render() {
    return (
      <div className="container">
        <h1>React starter</h1>

        Hello from {this.state.message} !!
      </div>
    );
  }

}
