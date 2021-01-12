import React , { Component } from "react";
import {Route , Redirect ,Switch} from 'react-router-dom';

import NotFound from "./components/NotFound";
import NavBar from "./components/navbar";
import MainPage from "./components/mainpage";
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
        catch(err){
           
        }        
  }

    render() { 
        
        return ( 
        <React.Fragment>
            <NavBar user={this.state.user} />
            <main>
                <Switch>
                <Route path="/evcharge/api/SessionsPerPoint/:PointID/:datefrom/:dateto" component={SessionsPerPoint}></Route>
                <Route path="/evcharge/api/SessionsPerStation/:stationID/:datefrom/:dateto" component={SessionsPerStation }></Route>
                <Route path="/evcharge/api/SessionsPerEV/:VehicleID/:datefrom/:dateto" component={SessionsPerEV }></Route>
                <Route path="/evcharge/api/SessionsPerProvider/:ProviderID/:datefrom/:dateto" component={SessionsPerProvider}></Route>
                <Route path="/evcharge/api/SessionsPerPoint/"  render={()=><SessionsForm SessionType="SessionsPerPoint" CID="PointID"/>}></Route>
                <Route path="/evcharge/api/SessionsPerStation/" render={()=><SessionsForm SessionType="SessionsPerStation" CID="StationID"/>}></Route>
                <Route path="/evcharge/api/SessionsPerEV/" render={()=><SessionsForm SessionType="SessionsPerEV" CID="VehicleID"/>}></Route>
                <Route path="/evcharge/api/SessionsPerProvider/" render={()=><SessionsForm SessionType="SessionsPerProvider" CID="ProviderID"/>}></Route>
                <Route path="/evcharge/api/admin/healthcheck" component={Healthcheck}></Route>
                <Route path="/evcharge/api/admin/resetsessions" component={Resetsessions}></Route>
                <Route path="/evcharge/api/admin/usermod/:username/:password" component={UserMod}></Route>
                <Route path="/evcharge/api/admin/usermod" component={Usermodform}></Route>
                <Route path="/evcharge/api/admin/users/:username" component={GetUser}></Route>
                <Route path="/evcharge/api/admin/users" component={GetUserForm}></Route>
                <Route path="/evcharge/api/admin/system/sessionsupd" component={SessionsUpd }></Route>
                <Route path="/evcharge/api/login" component={Login}></Route>
                <Route path="/evcharge/api/logout" component={Logout}></Route>
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
 