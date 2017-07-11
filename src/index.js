import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfiniteList extends Component {

  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    if (this.props.isAttachOnWindow) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.isAttachOnWindow) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onScroll(event) {
    const { isLoading, isEndReached, isAttachOnWindow, threshold, onReachThreshold } = this.props;

    if (isLoading || isEndReached) {
      return;
    }

    const { currentTarget } = event;

    const height = isAttachOnWindow ? currentTarget.innerHeight
      : currentTarget.clientHeight;

    const scrollTop = isAttachOnWindow ? currentTarget.pageYOffset
     : currentTarget.scrollTop;

    const scrollHeight = isAttachOnWindow ? currentTarget.document.body.scrollHeight
      : currentTarget.scrollHeight;

    const scrollPosition = Math.ceil(height + scrollTop);
    const scrollThreshold = scrollHeight - threshold;

    if (scrollPosition >= scrollThreshold) {
      onReachThreshold(event);
    }
  }

  // eslint-disable-next-line
  createPropsWithWindow() {
    return {};
  }

  createPropsWithContainer() {
    const { containerHeight } = this.props;

    return {
      onScroll: this.onScroll,
      style: {
        height: containerHeight,
        overflowY: 'scroll',
      },
    };
  }

  render() {
    const { isAttachOnWindow, children, containerTagName, className } = this.props;
    // @NOTE: use capitalize letter for for avoid JSX to create
    // <containerTagName> instead of <div>
    const ContainerTagName = containerTagName;
    const props = isAttachOnWindow ? this.createPropsWithWindow()
      : this.createPropsWithContainer();

    return (
      <ContainerTagName
        className={className}
        {...props}
      >
        {children}
      </ContainerTagName>
    );
  }

}

InfiniteList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isEndReached: PropTypes.bool.isRequired,
  isAttachOnWindow: PropTypes.bool.isRequired,
  onReachThreshold: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  containerHeight: PropTypes.string,
  className: PropTypes.string,
  containerTagName: PropTypes.string,
  threshold: PropTypes.number,
};

InfiniteList.defaultProps = {
  containerHeight: '',
  className: 'infinite-list',
  containerTagName: 'div',
  threshold: 0,
};

export default InfiniteList;
