import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import Layout from './hoc/Layout/layout';

import { Dashboard, Home, NewsArticle, NewsMain, SignIn, VideoArticle, VideosMain } from './components';
// import { firebase } from './firebase-config';

const Router = (props: any) => {
  window.console.log(props)
  return (
    <Layout user={props.user}>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/news/' exact={true} component={NewsMain} />
        <Route path='/articles/:id' exact={true} component={NewsArticle} />
        <Route path='/videos/:id' exact={true} component={VideoArticle} />          
        <Route path='/videos/' exact={true} component={VideosMain} />
        <Route path='/sign-in/' exact={true} component={SignIn} />
        <Route path='/dashboard' exact={true} component={Dashboard} />
      </Switch>
    </Layout>
  )
}

export default Router;