import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import Layout from './hoc/Layout/layout';


import { Home, NewsArticle, NewsMain, VideoArticle, VideosMain } from './components';

class Router extends React.Component {
  public render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/news/' exact={true} component={NewsMain} />
          <Route path='/articles/:id' exact={true} component={NewsArticle} />
          <Route path='/videos/:id' exact={true} component={VideoArticle} />          
          <Route path='/videos/' exact={true} component={VideosMain} />
        </Switch>
      </Layout>
    )
  }
}

export default Router;