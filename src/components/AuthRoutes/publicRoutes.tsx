import { User } from 'firebase';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const PublicRoutes = ({
  component: Comp,
  user,
  ...rest
}: any) => {

  return (
    <Route {...rest} component={(props: any) => (
      rest.restricted ? 
        ( user ? <Redirect to={'/dashboard/'} /> : <Comp {...props} user={user} /> ) 
      : 
        <Comp {...props} user={user} />
    )}
  />      
  )
}

export default PublicRoutes;
