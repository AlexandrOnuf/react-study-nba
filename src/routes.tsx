import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import Layout from './hoc/Layout/layout';


import { Home, NewsArticle, VideoArticle } from './components';

class Router extends React.Component {
  public render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/articles/:id' exact={true} component={NewsArticle} />
          <Route path='/videos/:id' exact={true} component={VideoArticle} />          
        </Switch>
      </Layout>
    )
  }
}

export default Router;