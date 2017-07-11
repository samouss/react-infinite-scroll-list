import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfiniteList extends Component {

  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(event) {
    const { isLoading, isEndReach, threshold, onThresholdReach } = this.props;

    if (isLoading || isEndReach) {
      return;
    }

    const { target } = event;

    const scrollPosition = Math.ceil(target.clientHeight + target.scrollTop);
    const scrollThreshold = target.scrollHeight - threshold;

    if (scrollPosition >= scrollThreshold) {
      onThresholdReach(event);
    }
  }

  render() {
    const {
      containerHeight,
      children,
      className,
      containerTagName,
    } = this.props;
    // @NOTE: use capitalize letter for for avoid JSX to create
    // <containerTagName> instead of <div>
    const ContainerTagName = containerTagName;

    return (
      <ContainerTagName
        className={className}
        style={{ height: containerHeight, overflowY: 'scroll' }}
        onScroll={this.onScroll}
      >
        {children}
      </ContainerTagName>
    );
  }

}

InfiniteList.propTypes = {
  containerHeight: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isEndReach: PropTypes.bool.isRequired,
  onThresholdReach: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  containerTagName: PropTypes.string,
  threshold: PropTypes.number,
};

InfiniteList.defaultProps = {
  children: null,
  className: 'infinite-list',
  containerTagName: 'div',
  threshold: 0,
};

export default InfiniteList;
