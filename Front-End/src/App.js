import React , { Component } from "react";
import {Route , Redirect ,Switch} from 'react-router-dom';
import SessionsPerStation from "./components/SessionsPerStation";
import SessionsPerPoint from "./components/SessionsPerPoint";
import NotFound from "./components/NotFound";
import NavBar from "./components/navbar";
import MainPage from "./components/mainpage";
import See from "./components/see";


class App extends Component {
    state = {  }
    render() { 
        
        return ( 
        <React.Fragment>
            <NavBar />
            <main>
                <Switch>
                <Route path="/evcharge/api/SessionsPerStation/:stationID/:datefrom/:dateto" component={See}></Route>
                <Route path="/evcharge/api/SessionsPerPoint" component={SessionsPerPoint}></Route>
                <Route path="/evcharge/api/SessionsPerStation/" component={SessionsPerStation}></Route>
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