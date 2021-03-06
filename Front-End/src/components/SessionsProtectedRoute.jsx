import React from 'react';
import {Route , Redirect } from 'react-router-dom';

const ProtectedRoute = ({path ,user, component : Component,SessionType , CID}) => {
     
    return (  
      <Route
         path={path}
         render = {props =>{
           if(!user)  return <Redirect to="/evcharge/api/login"/>
           return <Component SessionType={SessionType} CID={CID}/>
         }} 
      />
          );
        
}
 
export default ProtectedRoute;