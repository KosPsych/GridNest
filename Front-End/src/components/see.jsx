import React , { Component }from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
  class See extends Component {
      state = { 
         Sessions :[] , 
         boo :false
       }
       

       async componentDidMount(){
           
        const {data: Sessions}= await axios.get("http://localhost:8765/evcharge/api/SessionsPerStation/"+this.props.match.params.stationID+"/"+this.props.match.params.datefrom+"/"+this.props.match.params.dateto);
        this.state.boo=true
        this.setState({Sessions})
    
       }

      
      render() { 

          if(this.state.boo){  
          
          
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
    <th>{Session.EnergyDelivered}</th>
    <th>{Session.PointID}</th>
    <th>{Session.PointID}</th>
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
   
  export default See;