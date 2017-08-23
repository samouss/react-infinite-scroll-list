import 'intersection-observer';
import React from 'react';
import { render } from 'react-dom';
import Container from './Container';
import ContainerWithLoader from './ContainerWithLoader';
import ContainerWithCustomTagName from './ContainerWithCustomTagName';
import ContainerWithViewport from './ContainerWithViewport';
import './index.css';

const App = () =>
  <div>
    <Container />
    <ContainerWithLoader />
    <ContainerWithCustomTagName />
    <ContainerWithViewport />
  </div>;

render(<App />, document.getElementById('root'));
