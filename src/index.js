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
    threshold = 0,
  } = props;

  return (
    <ul
      className={className}
      style={{ height: containerHeight, 'overflow-y': 'scroll' }}
      onScroll={onScroll(isLoading, isEndReach, threshold, onThresholdReach)}
    >
      {children}
    </ul>
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

    const scrollPosition = target.clientHeight + target.scrollTop;
    const scrollThreshold = Math.ceil(target.scrollHeight - threshold);

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
  threshold: PropTypes.number,
};
