import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'components/Router';
import 'styles/index.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
