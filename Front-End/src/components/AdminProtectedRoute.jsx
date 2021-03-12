import React from 'react';
import {Route , Redirect } from 'react-router-dom';

const AdminProtectedRoute = ({path ,user,admin, component : Component}) => {
    return (  
      <Route
         path={path}
         render = {props =>{
           if(!user || admin==0 )  return <Redirect to="/evcharge/api/NotFound"/>
           return <Component {...props}/>
         }} 
      />
          );
        
}
 
export default AdminProtectedRoute;