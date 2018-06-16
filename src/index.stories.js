import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import InfiniteList from './index';

const createPlaceholderElement = (items = []) =>
  new Array(25).fill(null).map((_, index) => {
    const value = items.length + index;

    return {
      id: value,
      message: `Placeholder ${value}`,
    };
  });

class Container extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    delay: PropTypes.number,
  };

  static defaultProps = {
    delay: 0,
  };

  state = {
    items: createPlaceholderElement(),
    isLoading: false,
    isEndReached: false,
  };

  onReachThreshold = () => {
    const { delay } = this.props;

    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState(({ items }) => {
        const next = createPlaceholderElement(items);

        return {
          isLoading: false,
          items: items.concat(next),
        };
      });
    }, delay);
  };

  render() {
    const { items, isLoading, isEndReached } = this.state;

    return this.props.children({
      onReachThreshold: this.onReachThreshold,
      items,
      isLoading,
      isEndReached,
    });
  }
}

storiesOf('InfiniteList', module)
  .add('default', () => (
    <Container>
      {({ items, isLoading, isEndReached, onReachThreshold }) => (
        <InfiniteList
          containerClassName="InfiniteList InfiniteList--with-height"
          root="container"
          isLoading={isLoading}
          isEndReached={isEndReached}
          onReachThreshold={onReachThreshold}
          threshold={150}
        >
          {items.map(item => (
            <div className="InfiniteList__Item" key={item.id}>
              {item.message}
            </div>
          ))}
        </InfiniteList>
      )}
    </Container>
  ))
  .add('with loader', () => (
    <Container delay={2500}>
      {({ items, isLoading, isEndReached, onReachThreshold }) => (
        <InfiniteList
          containerClassName="InfiniteList InfiniteList--with-height"
          root="container"
          isLoading={isLoading}
          isEndReached={isEndReached}
          onReachThreshold={onReachThreshold}
          threshold={150}
        >
          {items.map(item => (
            <div className="InfiniteList__Item" key={item.id}>
              {item.message}
            </div>
          ))}
          {isLoading && <li className="InfiniteList__Item">Loading...</li>}
        </InfiniteList>
      )}
    </Container>
  ))
  .add('with custom tag name', () => (
    <Container>
      {({ items, isLoading, isEndReached, onReachThreshold }) => (
        <InfiniteList
          containerClassName="InfiniteList InfiniteList--with-height"
          root="container"
          containerTagName="ul"
          sentinelTagName="li"
          isLoading={isLoading}
          isEndReached={isEndReached}
          onReachThreshold={onReachThreshold}
          threshold={150}
        >
          {items.map(item => (
            <li className="InfiniteList__Item" key={item.id}>
              {item.message}
            </li>
          ))}
        </InfiniteList>
      )}
    </Container>
  ))
  .add('with viewport', () => (
    <Container>
      {({ items, isLoading, isEndReached, onReachThreshold }) => (
        <InfiniteList
          containerClassName="InfiniteList"
          root="viewport"
          isLoading={isLoading}
          isEndReached={isEndReached}
          onReachThreshold={onReachThreshold}
          threshold={350}
        >
          {items.map(item => (
            <div className="InfiniteList__Item" key={item.id}>
              {item.message}
            </div>
          ))}
        </InfiniteList>
      )}
    </Container>
  ));
