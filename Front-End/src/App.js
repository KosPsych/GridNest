import React , { Component } from "react";
import {Route , Redirect ,Switch} from 'react-router-dom';

import NotFound from "./components/NotFound";
import NavBar from "./components/navbar";
import MainPage from "./components/mainpage";
import SessionsPerStation from "./components/SessionsPerStation";
import SessionsPerPoint from "./components/SessionsPerPoint";
import SessionsPerEV from "./components/SessionsPerEV";
import SessionsPerProvider from "./components/SessionsPerProvider";
import Form from "./components/Form";

class App extends Component {
    state = {  }
    render() { 
        
        return ( 
        <React.Fragment>
            <NavBar />
            <main>
                <Switch>
                <Route path="/evcharge/api/SessionsPerPoint/:PointID/:datefrom/:dateto" component={SessionsPerPoint}></Route>
                <Route path="/evcharge/api/SessionsPerStation/:stationID/:datefrom/:dateto" component={SessionsPerStation }></Route>
                <Route path="/evcharge/api/SessionsPerEV/:VehicleID/:datefrom/:dateto" component={SessionsPerEV }></Route>
                <Route path="/evcharge/api/SessionsPerProvider/:ProviderID/:datefrom/:dateto" component={SessionsPerProvider}></Route>
                <Route path="/evcharge/api/SessionsPerPoint/"  render={()=><Form SessionType="SessionsPerPoint" CID="PointID"/>}></Route>
                <Route path="/evcharge/api/SessionsPerStation/" render={()=><Form SessionType="SessionsPerStation" CID="StationID"/>}></Route>
                <Route path="/evcharge/api/SessionsPerEV/" render={()=><Form SessionType="SessionsPerEV" CID="VehicleID"/>}></Route>
                <Route path="/evcharge/api/SessionsPerProvider/" render={()=><Form SessionType="SessionsPerProvider" CID="ProviderID"/>}></Route>
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