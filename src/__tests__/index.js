import React from 'react';
import { shallow } from 'enzyme';
import InfiniteList from '../index';

global.IntersectionObserver = jest.fn();

describe('<InfiniteList /> on Container', () => {
  const render = (props) => {
    const defaultProps = {
      root: 'container',
      isLoading: false,
      isEndReached: false,
      onReachThreshold: () => {},
    };

    return shallow(
      <InfiniteList
        {...defaultProps}
        {...props}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );
  };

  beforeEach(() => {
    global.IntersectionObserver.mockReset();
  });

  it('expect to render', () => {
    const component = render();

    expect(component).toMatchSnapshot();
  });

  it('expect to render with custom className', () => {
    const props = {
      className: 'custom-infinite-list',
    };

    const component = render(props);

    expect(component).toMatchSnapshot();
  });

  it('expect to render with custom tagName', () => {
    const props = {
      containerTagName: 'ul',
      sentinelTagName: 'li',
    };

    const component = render(props);

    expect(component).toMatchSnapshot();
  });

  it('expect to render with threshold', () => {
    const props = {
      threshold: 150,
    };

    const component = render(props);

    expect(component).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('expect to create an IntersectionObserver on viewport', () => {
      const props = {
        root: 'viewport',
      };

      const component = render(props);

      global.IntersectionObserver.mockImplementation(() => ({
        observe: () => {},
      }));

      component.instance().componentDidMount();

      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        component.instance().onIntersection,
        { root: null },
      );
    });

    it('expect to create an IntersectionObserver on container', () => {
      const props = {
        root: 'container',
      };

      const component = render(props);

      global.IntersectionObserver.mockImplementation(() => ({
        observe: () => {},
      }));

      // @NOTE: simulate ref
      component.instance().root = 'container-element';

      component.instance().componentDidMount();

      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        component.instance().onIntersection,
        { root: 'container-element' },
      );
    });

    it('expect to observe the sentinel from IntersectionObserver', () => {
      const component = render();
      const observe = jest.fn();

      global.IntersectionObserver.mockImplementation(() => ({
        observe,
      }));

      // @NOTE: simulate ref
      component.instance().sentinel = 'sentinel-element';

      component.instance().componentDidMount();

      expect(observe).toHaveBeenCalledWith('sentinel-element');
    });
  });

  describe('componentWillUnmount', () => {
    it('expect to disconnect from IntersectionObserver', () => {
      const component = render();
      const disconnect = jest.fn();

      global.IntersectionObserver.mockImplementation(() => ({
        observe: () => {},
        disconnect,
      }));

      // @NOTE: simulate didMount
      component.instance().io = new global.IntersectionObserver();

      component.instance().componentWillUnmount();

      expect(disconnect).toHaveBeenCalled();
    });
  });

  describe('onIntersection', () => {
    it('expect to call onReachThreshold when entry is intersecting', () => {
      const props = {
        onReachThreshold: jest.fn(),
      };

      const component = render(props);

      component.instance().onIntersection([
        { isIntersecting: true },
      ]);

      expect(props.onReachThreshold).toHaveBeenCalled();
    });

    it('expect to not call onReachThreshold when entry is not intersecting', () => {
      const props = {
        onReachThreshold: jest.fn(),
      };

      const component = render(props);

      component.instance().onIntersection([
        { isIntersecting: false },
      ]);

      expect(props.onReachThreshold).not.toHaveBeenCalled();
    });

    it('expect to not call onReachThreshold when is loading', () => {
      const props = {
        isLoading: true,
        onReachThreshold: jest.fn(),
      };

      const component = render(props);

      component.instance().onIntersection();

      expect(props.onReachThreshold).not.toHaveBeenCalled();
    });

    it('expect to not call onReachThreshold when is end reached', () => {
      const props = {
        isEndReached: true,
        onReachThreshold: jest.fn(),
      };

      const component = render(props);

      component.instance().onIntersection();

      expect(props.onReachThreshold).not.toHaveBeenCalled();
    });
  });
});
