import React from 'react';
import {Route , Redirect } from 'react-router-dom';

const ProtectedRoute = ({path ,user, component : Component}) => {
   
    return (  
      <Route
         path={path}
         render = {props =>{
           if(!user)  return <Redirect to="/evcharge/api/login"/>
           return <Component {...props}/>
         }} 
      />
          );
        
}
 
export default ProtectedRoute;