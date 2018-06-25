import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import Layout from './hoc/Layout/layout';


import Home from './components/Home/home';

class Router extends React.Component {
  public render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact={true} component={Home} />
        </Switch>
      </Layout>
    )
  }
}

export default Router;