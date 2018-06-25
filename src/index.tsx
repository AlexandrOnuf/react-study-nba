import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import Routes from './routes';


const App = () => {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  )  
};

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
