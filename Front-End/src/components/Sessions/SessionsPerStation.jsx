import React , { Component }from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
  class SessionsPerStation extends Component {
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
             const {data: Sessions}= await axios.get(
               "https://localhost:8765/evcharge/api/SessionsPerStation/"
               +this.props.match.params.stationID+"/"+this.props.match.params.datefrom+"/"
               +this.props.match.params.dateto , config);
             this.state.second_render=true
             this.setState({Sessions})
             } 
        catch (error) {
          this.setState({errors : error.response.data +" " +error.response.status})
        }
    }

      
      render() { 

          if(this.state.second_render){  
             return ( 
                  <React.Fragment>
                     <ul>
                       <li>StationID : {this.props.match.params.stationID}</li>
                       <li>Operator : {this.state.Sessions.Operator}</li>  
                       <li>RequestTimestamp : {this.state.Sessions.RequestTimestamp }</li>
                       <li>PeriodFrom : {this.state.Sessions.PeriodFrom}</li>
                       <li>PeriodTo : {this.state.Sessions.PeriodTo}</li>
                       <li>TotalEnergyDelivered : {this.state.Sessions.TotalEnergyDelivered}</li>
                       <li>NumberOfActivePoints : {this.state.Sessions.NumberOfActivePoints}</li>
                       <li>NumberOfChargingSessions : {this.state.Sessions.NumberOfChargingSessions}</li>
                     </ul>
                  <Table striped bordered hover>
                    <thead>
                       <tr> 
                         <th>PointID</th>
                         <th>PointSessions</th>
                         <th>EnergyDelivered</th>
                       </tr>
                    </thead>
                    <tbody>
                       {this.state.Sessions.SessionsSummaryList.map(Session => (
                         <tr key={Session.PointID}>
                            <th>{Session.PointID}</th>
                            <th>{Session.PointSessions}</th>
                            <th>{Session.EnergyDelivered}</th>
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
   
  export default SessionsPerStation;