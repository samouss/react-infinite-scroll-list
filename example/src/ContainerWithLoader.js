/* eslint-disable import/extensions */
/* eslint import/no-unresolved: [2, { ignore: ['react-infinite-scroll-list'] }] */

import React, { Component } from 'react';
import InfiniteList from 'react-infinite-scroll-list';

export default class ContainerWithLoader extends Component {
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

    setTimeout(() => {
      this.setState({
        isLoading: false,
        items: this.state.items.concat(items),
      });
    }, 2500);
  }

  renderFooter() {
    if (!this.state.isLoading) {
      return null;
    }

    return <li className="InfiniteList__Item">Loading...</li>;
  }

  render() {
    const { isLoading, isEndReached, items } = this.state;

    return (
      <div>
        <p className="Title">Simple infite list with loader</p>

        <InfiniteList
          containerClassName="InfiniteList InfiniteList--with-height"
          root="container"
          isLoading={isLoading}
          isEndReached={isEndReached}
          onReachThreshold={this.createElement}
          threshold={150}
        >
          {items.map(item =>
            <div className="InfiniteList__Item" key={item.id}>
              {item.message}
            </div>,
          )}
          {this.renderFooter()}
        </InfiniteList>
      </div>
    );
  }
}
