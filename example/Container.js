import React, { Component } from 'react';
import InfiniteList from '../src';

export default class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEndReach: false,
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
    const { isLoading, isEndReach, items } = this.state;

    return (
      <div>
        <p className="title-infinite-list">Simple infite list</p>

        <InfiniteList
          className="custom-infinite-list"
          containerHeight="648px"
          isLoading={isLoading}
          isEndReach={isEndReach}
          onThresholdReach={this.createElement}
          threshold={150}
        >
          {items.map(item => (
            <div
              className="custom-infinite-list__item"
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
