import React from 'react';
import { shallow } from 'enzyme';
import InfiniteList from '../index';

describe('<InfiniteList />', () => {
  const defaultProps = {
    containerHeight: '750px',
    isLoading: false,
    isEndReach: false,
    onThresholdReach: () => {},
  };

  it('expect to render with default props', () => {
    const props = {
      ...defaultProps,
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to render with given props', () => {
    const props = {
      ...defaultProps,
      className: 'custom-infinite-list',
      containerTagName: 'ul',
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <li>Child 1</li>
        <li>Child 2</li>
        <li>Child 3</li>
      </InfiniteList>,
    );

    expect(component).toMatchSnapshot();
  });

  it('expect to call onThresholdReach with event as parameter', () => {
    const props = {
      ...defaultProps,
      onThresholdReach: jest.fn(),
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    component
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    expect(props.onThresholdReach).toHaveBeenCalledWith({
      target: {
        clientHeight: 750,
        scrollHeight: 1000,
        scrollTop: 250,
      },
    });
  });

  it('expect to call onThresholdReach if default threshold is reach', () => {
    const props = {
      ...defaultProps,
      onThresholdReach: jest.fn(),
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    component
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    expect(props.onThresholdReach).toHaveBeenCalledTimes(1);
  });

  it('expect to call onThresholdReach if given threshold is reach', () => {
    const props = {
      ...defaultProps,
      onThresholdReach: jest.fn(),
      threshold: 100,
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    component
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 150,
        },
      });

    expect(props.onThresholdReach).toHaveBeenCalledTimes(1);
  });

  it('expect to not call onThresholdReach if default threshold is not reach', () => {
    const props = {
      ...defaultProps,
      onThresholdReach: jest.fn(),
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    component
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 200,
        },
      });

    expect(props.onThresholdReach).not.toHaveBeenCalled();
  });

  it('expect to not call onThresholdReach if given threshold is not reach', () => {
    const props = {
      ...defaultProps,
      onThresholdReach: jest.fn(),
      threshold: 100,
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    component
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 100,
        },
      });

    expect(props.onThresholdReach).not.toHaveBeenCalled();
  });

  it('expect to not call onThresholdReach if loading is true', () => {
    const props = {
      ...defaultProps,
      onThresholdReach: jest.fn(),
      isLoading: true,
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    component
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    expect(props.onThresholdReach).not.toHaveBeenCalled();
  });

  it('expect to not call onThresholdReach if end is reach', () => {
    const props = {
      ...defaultProps,
      onThresholdReach: jest.fn(),
      isEndReach: true,
    };

    const component = shallow(
      <InfiniteList
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    component
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    expect(props.onThresholdReach).not.toHaveBeenCalled();
  });
});
