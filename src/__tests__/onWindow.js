import React from 'react';
import { shallow } from 'enzyme';
import InfiniteList from '../index';

describe('<InfiniteList /> on Window', () => {
  const defaultProps = {
    containerHeight: '750px',
    isLoading: false,
    isEndReach: false,
    isAttachOnWindow: true,
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

  describe('componentDidMount', () => {
    it('expect to add scroll listener', () => {
      global.addEventListener = jest.fn();

      const props = {
        ...defaultProps,
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

      component.instance().componentDidMount();

      expect(global.addEventListener).toHaveBeenCalledWith(
        'scroll',
        component.instance().onScroll,
      );
    });
  });

  describe('componentWillUnmount', () => {
    it('expect to remove scroll listener', () => {
      global.removeEventListener = jest.fn();

      const props = {
        ...defaultProps,
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

      component.instance().componentWillUnmount();

      expect(global.removeEventListener).toHaveBeenCalledWith(
        'scroll',
        component.instance().onScroll,
      );
    });
  });

  describe('onScroll', () => {
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

      component.instance().onScroll({
        currentTarget: {
          innerHeight: 750,
          pageYOffset: 250,
          document: {
            body: {
              scrollHeight: 1000,
            },
          },
        },
      });

      expect(props.onThresholdReach).toHaveBeenCalledWith({
        currentTarget: {
          innerHeight: 750,
          pageYOffset: 250,
          document: {
            body: {
              scrollHeight: 1000,
            },
          },
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

      component.instance().onScroll({
        currentTarget: {
          innerHeight: 750,
          pageYOffset: 250,
          document: {
            body: {
              scrollHeight: 1000,
            },
          },
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

      component.instance().onScroll({
        currentTarget: {
          innerHeight: 750,
          pageYOffset: 150,
          document: {
            body: {
              scrollHeight: 1000,
            },
          },
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
          currentTarget: {
            innerHeight: 750,
            pageYOffset: 200,
            document: {
              body: {
                scrollHeight: 1000,
              },
            },
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
          currentTarget: {
            innerHeight: 750,
            pageYOffset: 100,
            document: {
              body: {
                scrollHeight: 1000,
              },
            },
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
          currentTarget: {
            innerHeight: 750,
            pageYOffset: 250,
            document: {
              body: {
                scrollHeight: 1000,
              },
            },
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
          currentTarget: {
            innerHeight: 750,
            pageYOffset: 250,
            document: {
              body: {
                scrollHeight: 1000,
              },
            },
          },
        });

      expect(props.onThresholdReach).not.toHaveBeenCalled();
    });
  });
});
