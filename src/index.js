import React, { PropTypes } from 'react';

/**
 * @name   InfiniteList
 * @desc   Display given children nodes and attach scroll event on <ul> for handle reload on scroll
 * @return {ReactElement}
 */
export default function InfiniteList(props) {
  const {
    containerHeight,
    isLoading,
    isEndReach,
    onThresholdReach,
    children,
    className = 'infinite-list',
    containerTagName = 'div',
    threshold = 0,
  } = props;
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
}

/**
 * @name   onScroll
 * @desc   Takes given props for determine then return function who takes event and determine if we need to execute
 *         callback for load more content
 * @param  {boolean}                      isLoading
 * @param  {boolean}                      isEndReach
 * @param  {number}                       threshold
 * @param  {Function}                     callback
 * @return {(event: ScrollEvent) => void}
 */
function onScroll(isLoading, isEndReach, threshold, callback) {
  return (event) => {
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
