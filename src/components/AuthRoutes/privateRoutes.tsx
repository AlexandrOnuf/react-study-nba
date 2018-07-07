import { User } from 'firebase';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  component: any;
  user: User;
  rest: any;
}

const PrivateRoutes = ({
  component: Comp,
  user,
  ...rest
}: Props) => {

  return (
    <Route {...rest} component={(props: any) => (
      user ? <Comp {...props} user={user} /> : <Redirect to={'/sign-in'}/>
    )}
  />      
  )
}

export default PrivateRoutes;
