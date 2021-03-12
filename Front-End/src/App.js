import React , { Component } from "react";
import {Route , Redirect ,Switch} from 'react-router-dom';
import NotFound from "./components/NotFound";
import NavBar from "./components/navbar";
import MainPage from "./components/mainpage";
import ProtectedRoute from "./components/protectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import SessionsProtectedRoute from "./components/SessionsProtectedRoute";
import Login from "./components/login";
import Logout from "./components/logout";
import Healthcheck from "./components/Admin/healthcheck";
import Resetsessions from "./components/Admin/resetsessions";
import SessionsPerStation from "./components/Sessions/SessionsPerStation";
import SessionsPerPoint from "./components/Sessions/SessionsPerPoint";
import SessionsPerEV from "./components/Sessions/SessionsPerEV";
import SessionsPerProvider from "./components/Sessions/SessionsPerProvider";
import Usermodform from "./components/Forms/AdminUsermodForm";
import GetUserForm from "./components/Forms/AdminGetUserForm";
import SessionsForm from "./components/Forms/SessionsForm";
import UserMod from "./components/Admin/usermod";
import GetUser from "./components/Admin/users";
import SessionsUpd from "./components/Admin/sessionsupd";
import jwtDecode from 'jwt-decode';
import './components/style.css'
class App extends Component {
    state = { 
      admin : 0
       
     }

          
  constructor() {
    super()
    try {
      const jwt =localStorage.getItem("token")
      const user =jwtDecode(jwt)
      this.state={user}
      if (user){this.state.admin=user.isAdmin }
      
        }
   catch(err){}        
      
  }

  
 

    render() { 
  
        return ( 
        <div >
            <NavBar user={this.state.user} />
            <main>
                <Switch>

                <ProtectedRoute path="/evcharge/api/SessionsPerPoint/:PointID/:datefrom/:dateto" user={this.state.user}  component={SessionsPerPoint}/>
                <ProtectedRoute path="/evcharge/api/SessionsPerStation/:stationID/:datefrom/:dateto" user={this.state.user} component={SessionsPerStation}/>
                <ProtectedRoute path="/evcharge/api/SessionsPerEV/:VehicleID/:datefrom/:dateto" user={this.state.user} component={SessionsPerEV}/>
                <ProtectedRoute path="/evcharge/api/SessionsPerProvider/:ProviderID/:datefrom/:dateto" user={this.state.user} component={SessionsPerProvider}/>

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
                

                <AdminProtectedRoute path="/evcharge/api/admin/system/sessionsupd" user={this.state.user} admin={this.state.admin} component={SessionsUpd}/>
                <AdminProtectedRoute path="/evcharge/api/admin/usermod/:username/:password" admin={this.state.admin} user={this.state.user}  component={UserMod}/>
                <AdminProtectedRoute path="/evcharge/api/admin/usermod" user={this.state.user}  admin={this.state.admin} component={Usermodform}/>
                <AdminProtectedRoute path="/evcharge/api/admin/users/:username" user={this.state.user}  admin={this.state.admin} component={GetUser}/>
                <AdminProtectedRoute path="/evcharge/api/admin/users" user={this.state.user} admin={this.state.admin}  component={GetUserForm}/>
                <ProtectedRoute path="/evcharge/api/logout" user={this.state.user}  component={Logout}/>

                <Route path="/evcharge/api/admin/healthcheck" component={Healthcheck}></Route>
                <Route path="/evcharge/api/admin/resetsessions" component={Resetsessions}></Route>
                <Route path="/evcharge/api/login" component={Login}></Route>
                <Route path="/evcharge/api/NotFound" component={NotFound}></Route>
                <Route path="/evcharge/api" exact component={MainPage}></Route>

                <Redirect from ="/" exact to ="/evcharge/api" />
                <Redirect  to ="/evcharge/api/NotFound" /> 

                </Switch>
            </main>
        
        </div>
        );
    }
}

export default App;
 