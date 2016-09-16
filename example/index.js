import React, { Component } from 'react';
import { render } from 'react-dom';
import InfiniteList from '../src';
import './index.css';

class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEndReach: false,
      items: [],
    };

    this.onThresholdReach = this.onThresholdReach.bind(this);
  }

  componentDidMount() {
    this.createElement();
  }

  onThresholdReach() {
    this.createElement();
  }

  createElement() {
    const items = [];

    for (let i = 0; i < 25; i += 1) {
      const value = this.state.items.length + i;

      items.push({
        id: value,
        message: `Placeholder ${value}`,
      });
    }

    this.setState({ items: this.state.items.concat(items) });
  }

  render() {
    const { isLoading, isEndReach, items } = this.state;

    return (
      <InfiniteList
        className="custom-infinite-list"
        containerHeight="648px"
        isLoading={isLoading}
        isEndReach={isEndReach}
        onThresholdReach={this.onThresholdReach}
        threshold={150}
      >
      {items.map(item => (
        <li
          className="custom-infinite-list__item"
          key={item.id}
        >
          {item.message}
        </li>
      ))}
      </InfiniteList>
    );
  }
}

render(
  <Container />,
  document.getElementById('root')
);
