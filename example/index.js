import React from 'react';
import { render } from 'react-dom';
import Container from './Container';
import ContainerWithLoader from './ContainerWithLoader';
import './index.css';

const App = () => (
  <div>
    <Container />
    <ContainerWithLoader />
  </div>
);

render(
  <App />,
  document.getElementById('root')
);
