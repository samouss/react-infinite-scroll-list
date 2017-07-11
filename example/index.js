import React from 'react';
import { render } from 'react-dom';
import Container from './Container';
import ContainerWithLoader from './ContainerWithLoader';
import ContainerWithCustomTagName from './ContainerWithCustomTagName';
import ContainerWithWindow from './ContainerWithWindow';
import './index.css';

const App = () => (
  <div>
    <Container />
    <ContainerWithLoader />
    <ContainerWithCustomTagName />
    <ContainerWithWindow />
  </div>
);

render(
  <App />,
  document.getElementById('root'),
);
