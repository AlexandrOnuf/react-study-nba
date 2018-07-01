import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { firebase } from './firebase-config';
import Routes from './routes';


const App = (props: {user: firebase.User | null}) => {
  return (
    <BrowserRouter>
      <Routes {...props} />
    </BrowserRouter>
  )  
};

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <App user={user}/>,
    document.getElementById('root') as HTMLElement
  );
});

