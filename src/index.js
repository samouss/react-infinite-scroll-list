import React from 'react';
import PropTypes from 'prop-types';

const onScroll = (isLoading, isEndReach, threshold, callback) => (event) => {
  if (isLoading || isEndReach) {
    return;
  }

  const { target } = event;

  const scrollPosition = Math.ceil(target.clientHeight + target.scrollTop);
  const scrollThreshold = target.scrollHeight - threshold;

  if (scrollPosition >= scrollThreshold) {
    callback(event);
  }
};

const InfiniteList = ({
  containerHeight,
  isLoading,
  isEndReach,
  onThresholdReach,
  children,
  className,
  containerTagName,
  threshold,
}) => {
  // @NOTE: use capitalize letter for for avoid JSX to create
  // <containerTagName> instead of <div>
  const ContainerTagName = containerTagName;

  return (
    <ContainerTagName
      className={className}
      style={{ height: containerHeight, overflowY: 'scroll' }}
      onScroll={onScroll(isLoading, isEndReach, threshold, onThresholdReach)}
    >
      {children}
    </ContainerTagName>
  );
};

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
