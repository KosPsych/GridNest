import React , { Component } from "react";
import {Route , Redirect ,Switch} from 'react-router-dom';

import NotFound from "./components/NotFound";
import NavBar from "./components/navbar";
import MainPage from "./components/mainpage";
import ProtectedRoute from "./components/protectedRoute";
import SessionsProtectedRoute from "./components/SessionsProtectedRoute";
import Login from "./components/login";
import Logout from "./components/logout";
import Healthcheck from "./components/healthcheck";
import Resetsessions from "./components/resetsessions";
import SessionsPerStation from "./components/SessionsPerStation";
import SessionsPerPoint from "./components/SessionsPerPoint";
import SessionsPerEV from "./components/SessionsPerEV";
import SessionsPerProvider from "./components/SessionsPerProvider";
import Usermodform from "./components/Forms/AdminUsermodForm";
import GetUserForm from "./components/Forms/AdminGetUserForm";
import SessionsForm from "./components/Forms/SessionsForm";
import UserMod from "./components/Admin/usermod";
import GetUser from "./components/Admin/users";
import SessionsUpd from "./components/Admin/sessionsupd";
import jwtDecode from 'jwt-decode';

class App extends Component {
    state = { 
        
     }

     componentDidMount(){
       
        try {
           const jwt =localStorage.getItem("token")
           const user =jwtDecode(jwt)
           this.setState({user})
        }
        catch(err){}        
  }

 

    render() { 
        
        return ( 
        <React.Fragment>
            <NavBar user={this.state.user} />
            <main>
                <Switch>
                
                
                

                <ProtectedRoute path="/evcharge/api/SessionsPerPoint/:PointID/:datefrom/:dateto" user={this.state.user} component={SessionsPerPoint}/>
                <ProtectedRoute path="/evcharge/api/SessionsPerStation/:stationID/:datefrom/:dateto" user={this.state.user} component={SessionsPerStation}/>
                <ProtectedRoute path="/evcharge/api/SessionsPerEV/:VehicleID/:datefrom/:dateto" user={this.state.user} component={SessionsPerEV}/>
                <ProtectedRoute path="/evcharge/api/SessionsPerStation/:stationID/:datefrom/:dateto" user={this.state.user} component={SessionsPerProvider}/>

                <SessionsProtectedRoute 
                  path="/evcharge/api/SessionsPerPoint/"  
                  user={this.state.user} 
                  component={SessionsForm} 
                  SessionType="SessionsPerPoint" 
                  CID="PointID"/>

                <SessionsProtectedRoute 
                  path="/evcharge/api/SessionsPerStation/"  
                  user={this.state.user} 
                  component={SessionsForm} 
                  SessionType="SessionsPerStation" 
                  CID="StationID"/>
     
               <SessionsProtectedRoute 
                  path="/evcharge/api/SessionsPerEV/"  
                  user={this.state.user} 
                  component={SessionsForm} 
                  SessionType="SessionsPerEV" 
                  CID="VehicleID"/>

              <SessionsProtectedRoute 
                  path="/evcharge/api/SessionsPerProvider/"  
                  user={this.state.user} 
                  component={SessionsForm} 
                  SessionType="SessionsPerProvider" 
                  CID="ProviderID"/>  
                

                <ProtectedRoute path="/evcharge/api/admin/system/sessionsupd" user={this.state.user} component={SessionsUpd}/>
                <ProtectedRoute path="/evcharge/api/admin/usermod/:username/:password" user={this.state.user} component={UserMod}/>
                <ProtectedRoute path="/evcharge/api/admin/usermod" user={this.state.user} component={Usermodform}/>
                <ProtectedRoute path="/evcharge/api/admin/users/:username" user={this.state.user} component={GetUser}/>
                <ProtectedRoute path="/evcharge/api/admin/users" user={this.state.user} component={GetUserForm}/>
                <ProtectedRoute path="/evcharge/api/logout" user={this.state.user} component={Logout}/>

                <Route path="/evcharge/api/admin/healthcheck" component={Healthcheck}></Route>
                <Route path="/evcharge/api/admin/resetsessions" component={Resetsessions}></Route>
                <Route path="/evcharge/api/login" component={Login}></Route>
                <Route path="/evcharge/api/NotFound" component={NotFound}></Route>
                <Route path="/evcharge/api" exact component={MainPage}></Route>

                <Redirect from ="/" exact to ="/evcharge/api" />
                <Redirect  to ="/evcharge/api/NotFound" /> 

                </Switch>
            </main>
             
        </React.Fragment>
        );
    }
}

export default App;
 