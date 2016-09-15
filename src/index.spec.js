import chai from 'chai';
import sinon from 'sinon';
import React from 'react';

chai.should();

describe('sample', () => {
  it('should pass', () => {
    const expectation = true;
    const result = true;

    result.should.be.equal(expectation);
  });

  it('should pass too', () => {
    const spy = sinon.spy();

    spy();

    spy.calledOnce.should.be.equal(true);
  });

  it('should pass with JSX', () => {
    const component = (
      <div>Should contain test</div>
    );

    const expectation = (
      <div>Should contain test</div>
    );

    component.should.be.deep.equal(expectation);
  });
});
