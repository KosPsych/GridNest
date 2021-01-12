import React , { Component } from "react"
import axios from 'axios'
import Table from 'react-bootstrap/Table'


class SessionsPerPoint extends Component {
    state = { 
        Sessions :[] , 
        second_render :false
      }


      async componentDidMount(){
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-observatory-auth': localStorage.getItem("token")
          }}    
        const {data: Sessions}= await axios.get("https://localhost:8765/evcharge/api/SessionsPerPoint/"+this.props.match.params.PointID+"/"
        +this.props.match.params.datefrom+"/"+this.props.match.params.dateto,config);
        this.state.second_render=true
        this.setState({Sessions})
    
       }

       render() { 
        if(this.state.second_render){  
          return ( 
              <React.Fragment>
                <ul>
                 <li>PointID : {this.props.match.params.PointID}</li>
                 <li>Point Operator : {this.state.Sessions.PointOperator}</li>  
                 <li>RequestTimestamp : {this.state.Sessions.RequestTimestamp }</li>
                 <li>PeriodFrom : {this.state.Sessions.PeriodFrom}</li>
                 <li>PeriodTo : {this.state.Sessions.PeriodTo}</li>
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
                          <th>Payment</th>
                          <th>VehicleType</th>
                        </tr>
                    </thead>
                      <tbody>
                          {this.state.Sessions.ChargingSessionsList.map(Session => (
                                <tr key={Session.SessionID}>
                                    <th>{Session.SessionID}</th>
                                    <th>{Session.StartedOn}</th>
                                    <th>{Session.FinishedOn}</th>
                                    <th>{Session.Protocol}</th>
                                    <th>{Session.EnergyDelivered}</th>
                                    <th>{Session.Payment}</th>
                                    <th>{Session.VehicleType}</th>
                                 </tr>  
                                                                                ))
                            }
                        </tbody>
                  </Table>
                </React.Fragment>         

        );
      }
        else{
           return <h1>Waiting Server response...</h1>
            }}
}
 
export default SessionsPerPoint;