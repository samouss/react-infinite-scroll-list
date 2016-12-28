import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import InfiniteList from './index';

chai.should();

describe('<InfiniteList />', () => {
  it('should render the component correctly with default props', () => {
    const onThresholdReach = () => {};

    const expectation = (
      <div
        className="infinite-list"
        style={{ height: '750px', overflowY: 'scroll' }}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </div>
    );

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading={false}
        isEndReach={false}
        onThresholdReach={onThresholdReach}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  });

  it('should render the component correctly with given props', () => {
    const onThresholdReach = () => {};

    const expectation = (
      <ul
        className="custom-infinite-list"
        style={{ height: '750px', overflowY: 'scroll' }}
      >
        <li>Child 1</li>
        <li>Child 2</li>
        <li>Child 3</li>
      </ul>
    );

    const wrapper = shallow(
      <InfiniteList
        className="custom-infinite-list"
        containerHeight="750px"
        containerTagName="ul"
        isLoading={false}
        isEndReach={false}
        onThresholdReach={onThresholdReach}
      >
        <li>Child 1</li>
        <li>Child 2</li>
        <li>Child 3</li>
      </InfiniteList>,
    );

    wrapper.containsMatchingElement(expectation).should.be.equal(true);
  });

  it('should trigger onThresholdReach callback on scroll with event as parameter', () => {
    const onThresholdReach = sinon.spy();

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading={false}
        isEndReach={false}
        onThresholdReach={onThresholdReach}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    onThresholdReach.alwaysCalledWithExactly({
      target: {
        clientHeight: 750,
        scrollHeight: 1000,
        scrollTop: 250,
      },
    }).should.be.equal(true);
  });

  it('should trigger onThresholdReach callback on scroll if default threshold is reach', () => {
    const onThresholdReach = sinon.spy();

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading={false}
        isEndReach={false}
        onThresholdReach={onThresholdReach}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    onThresholdReach.calledOnce.should.be.equal(true);
  });

  it('should trigger onThresholdReach callback on scroll if given threshold is reach', () => {
    const onThresholdReach = sinon.spy();

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading={false}
        isEndReach={false}
        onThresholdReach={onThresholdReach}
        threshold={100}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 150,
        },
      });

    onThresholdReach.calledOnce.should.be.equal(true);
  });

  it('should not trigger onThresholdReach callback on scroll if default threshold is not reach', () => {
    const onThresholdReach = sinon.spy();

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading={false}
        isEndReach={false}
        onThresholdReach={onThresholdReach}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 200,
        },
      });

    onThresholdReach.calledOnce.should.be.equal(false);
  });

  it('should not trigger onThresholdReach callback on scroll if given threshold is not reach', () => {
    const onThresholdReach = sinon.spy();

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading={false}
        isEndReach={false}
        onThresholdReach={onThresholdReach}
        threshold={100}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 100,
        },
      });

    onThresholdReach.calledOnce.should.be.equal(false);
  });

  it('should not trigger onThresholdReach callback on scroll if loading is true', () => {
    const onThresholdReach = sinon.spy();

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading
        isEndReach={false}
        onThresholdReach={onThresholdReach}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    onThresholdReach.calledOnce.should.be.equal(false);
  });

  it('should not trigger onThresholdReach callback on scroll if end is reach', () => {
    const onThresholdReach = sinon.spy();

    const wrapper = shallow(
      <InfiniteList
        containerHeight="750px"
        isLoading={false}
        isEndReach
        onThresholdReach={onThresholdReach}
      >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </InfiniteList>,
    );

    wrapper
      .find('.infinite-list')
      .simulate('scroll', {
        target: {
          clientHeight: 750,
          scrollHeight: 1000,
          scrollTop: 250,
        },
      });

    onThresholdReach.calledOnce.should.be.equal(false);
  });
});
