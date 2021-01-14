import React , { Component } from "react"
import axios from 'axios'
import Table from 'react-bootstrap/Table'


class SessionsPerEV extends Component {
    state = { 
        Sessions :[] , 
        second_render :false,
        errors :""
      }


      async componentDidMount(){

        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-observatory-auth': localStorage.getItem("token")
          }
        } 
       
        try {
          const {data: Sessions}= await axios.get("https://localhost:8765/evcharge/api/SessionsPerEV/"+this.props.match.params.VehicleID+"/"
             +this.props.match.params.datefrom+"/"+this.props.match.params.dateto,config)
          this.state.second_render=true
          this.setState({Sessions}) 
        } catch (error) {
             this.setState({errors : error.response.data +" " +error.response.status})
        }
   }

       render() { 

        if(this.state.second_render){  
           return ( 
              <React.Fragment>
                 <ul>
                     <li>VehicleID : {this.props.match.params.VehicleID}</li> 
                     <li>RequestTimestamp : {this.state.Sessions.RequestTimestamp }</li>
                     <li>PeriodFrom : {this.state.Sessions.PeriodFrom}</li>
                     <li>PeriodTo : {this.state.Sessions.PeriodΤο}</li>
                     <li>TotalEnergyConsumed : {this.state.Sessions.TotalEnergyConsumed}</li>
                     <li>NumberOfVisitedPoints : {this.state.Sessions.NumberOfVisitedPoints}</li>
                     <li>NumberOfChargingSessions : {this.state.Sessions.NumberOfChargingSessions}</li>
                 </ul>
                <Table striped bordered hover>
                    <thead>
                        <tr> 
                          <th>SessionID</th>
                          <th>StartedOn</th>
                          <th>FinishedOn</th>
                          <th>Protocol</th>
                          <th>EnergyDelivered</th>
                          <th>CostPerKwh</th>
                          <th>SessionCost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Sessions.VehicleChargingSessionsList.map(Session => (
                            <tr key={Session.SessionID}>
                              <th>{Session.SessionID}</th>
                              <th>{Session.StartedOn}</th>
                              <th>{Session.FinishedOn}</th>
                              <th>{Session.Protocol}</th>
                              <th>{Session.EnergyDelivered}</th>
                              <th>{Session.CostPerKwh}</th>
                              <th>{Session.SessionCost}</th>
                            </tr>  
                         ))}
                      </tbody>
                  </Table>
                </React.Fragment>        
                 );
}
          else{
              if(this.state.errors){
                    return <h1>{this.state.errors}</h1>
                         }
              else{
                    return <h1>Waiting Server...</h1>
                          }
   }}
}
 
export default SessionsPerEV;