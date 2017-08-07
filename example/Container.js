import React, { Component } from 'react';
import InfiniteList from '../src';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEndReached: false,
      items: [],
    };

    this.createElement = this.createElement.bind(this);
  }

  componentDidMount() {
    this.createElement();
  }

  createElement() {
    this.setState({ isLoading: true });

    const items = [];

    for (let i = 0; i < 25; i += 1) {
      const value = this.state.items.length + i;

      items.push({
        id: value,
        message: `Placeholder ${value}`,
      });
    }

    this.setState({
      isLoading: false,
      items: this.state.items.concat(items),
    });
  }

  render() {
    const { isLoading, isEndReached, items } = this.state;

    return (
      <div>
        <p className="Title">Simple infite list</p>

        <InfiniteList
          className="InfiniteList InfiniteList--with-height"
          root="container"
          isLoading={isLoading}
          isEndReached={isEndReached}
          onReachThreshold={this.createElement}
          threshold={150}
        >
          {items.map(item => (
            <div
              className="InfiniteList__Item"
              key={item.id}
            >
              {item.message}
            </div>
          ))}
        </InfiniteList>
      </div>
    );
  }
}
