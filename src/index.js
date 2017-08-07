import 'intersection-observer';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ROOT_VIEWPORT_TYPE = 'viewport';
const ROOT_CONTAINER_TYPE = 'container';

class InfiniteList extends Component {
  constructor(props) {
    super(props);

    this.onIntersection = this.onIntersection.bind(this);
  }

  componentDidMount() {
    const { root } = this.props;

    this.io = new IntersectionObserver(this.onIntersection, {
      root: (root === ROOT_CONTAINER_TYPE) ? this.root : null,
    });

    this.io.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.io.disconnect();
  }

  onIntersection(entries) {
    const { isLoading, isEndReached, onReachThreshold } = this.props;

    if (isLoading || isEndReached) {
      return;
    }

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onReachThreshold(entry);
      }
    });
  }

  render() {
    const { children, className, containerTagName, sentinelTagName, threshold } = this.props;
    const ContainerTagName = containerTagName;
    const SentinelTagName = sentinelTagName;

    const containerStyle = {
      position: 'relative',
    };

    const sentinelStyle = {
      position: 'absolute',
      marginTop: `-${threshold}px`,
    };

    return (
      <ContainerTagName
        ref={(element) => { this.root = element; }}
        className={className}
        style={containerStyle}
      >
        {children}
        <SentinelTagName
          ref={(element) => { this.sentinel = element; }}
          className="-risl-sentinel"
          style={sentinelStyle}
        />
      </ContainerTagName>
    );
  }
}

InfiniteList.propTypes = {
  root: PropTypes.oneOf([
    ROOT_VIEWPORT_TYPE,
    ROOT_CONTAINER_TYPE,
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isEndReached: PropTypes.bool.isRequired,
  onReachThreshold: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  containerTagName: PropTypes.string,
  sentinelTagName: PropTypes.string,
  threshold: PropTypes.number,
};

InfiniteList.defaultProps = {
  className: 'infinite-list',
  containerTagName: 'div',
  sentinelTagName: 'div',
  threshold: 0,
};

export default InfiniteList;
