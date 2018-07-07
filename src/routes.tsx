import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import Layout from './hoc/Layout/layout';

import { 
  Dashboard, Home, NewsArticle, NewsMain, PrivateRoutes, PublicRoutes, 
  SignIn,  VideoArticle, VideosMain,
} from './components';

const Router = (props: any) => {
  window.console.log(props)
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoutes {...props} restricted={false} path='/' exact={true} component={Home} />
        <PublicRoutes {...props} restricted={false} path='/news/' exact={true} component={NewsMain} />
        <PublicRoutes {...props} restricted={false} path='/articles/:id' exact={true} component={NewsArticle} />
        <PublicRoutes {...props} restricted={false} path='/videos/:id' exact={true} component={VideoArticle} />          
        <PublicRoutes {...props} restricted={false} path='/videos/' exact={true} component={VideosMain} />
        <PublicRoutes {...props} restricted={true} path='/sign-in/' exact={true} component={SignIn} />
        <PrivateRoutes {...props} path='/dashboard' exact={true} component={Dashboard} />
      </Switch>
    </Layout>
  )
}

export default Router;