import React , { Component }from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
  class SessionsPerProvider extends Component {
      state = { 
         Sessions :[] , 
         second_render :false
       }
       

       async componentDidMount(){
           
        const {data: Sessions}= await axios.get("http://localhost:8765/evcharge/api/SessionsPerProvider/"+this.props.match.params.ProviderID+"/"+this.props.match.params.datefrom+"/"+this.props.match.params.dateto);
        this.state.second_render=true
        this.setState({Sessions})
    
       }

      
      render() { 

          if(this.state.second_render){  
          
          
          return ( 
            
            
            
              
            <React.Fragment>
              <ul>
               <li>ProviderID : {this.props.match.params.ProviderID}</li>
               <li>ProviderName : {this.state.Sessions.ProviderName}</li>    
              </ul>

               <Table striped bordered hover>
                 <thead>
                   <tr> 
                     <th>StationID</th>
                     <th>SessionID</th>
                     <th>VehicleID</th>
                     <th>StartedOn </th>
                     <th>FinishedOn</th>
                     <th>EnergyDelivered</th>
                     <th>CostPerKWh</th>
                     <th>TotalCost</th>
                   </tr>
                 </thead>
  <tbody>
  {this.state.Sessions.ProviderChargingSessionsList.map(Session => (
  <tr key={Session.SessionID}>
    <th>{Session.StationID}</th>
    <th>{Session.SessionID}</th>
    <th>{Session.VehicleID}</th>
    <th>{Session.StartedOn}</th>
    <th>{Session.FinishedOn}</th>
    <th>{Session.EnergyDelivered}</th>
    <th>{Session.CostPerKWh}</th>
    <th>{Session.TotalCost}</th>
    </tr>  
      ))}
  </tbody>
</Table>
  </React.Fragment>        
            
            
          
          );

  }
  else{
    return <h1>Waiting Server...</h1>
  }
      }
  }
   
  export default SessionsPerProvider;