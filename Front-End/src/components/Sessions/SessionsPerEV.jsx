import React , { Component } from "react"
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import '../style.css'
import {Pie} from 'react-chartjs-2';

class SessionsPerEV extends Component {
    state = { 
        Sessions :[] , 
        second_render :false,
        errors :"",
        labels: ["00:00-08:00","08:00-16:00","16:00-24:00"],
         datasets: [
            {
            label: 'Sessions per 8h partitions in 24h format',
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#2F4F4F',
              '#597272' 
                   ],
            hoverBackgroundColor: [
              'rgba(75,185,185,1)', 
              '#446161',
              '#788d8d'
            ],
            data: []
           }
          ]
       
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
            var counter1=0
            var counter2=0
            var counter3=0
            for (var i=0; i <Sessions.VehicleChargingSessionsList.length; i++){
                var hour=parseInt(Sessions.VehicleChargingSessionsList[i].StartedOn.split(" ")[1].substring(0, 2))
                if (hour>=16)
                  counter1=counter1+1
                else if(hour>=8)
                  counter2=counter2+1
                else 
                  counter3=counter3+1
              }
            this.state.datasets[0].data=[counter1,counter2,counter3]
        } catch (error) {
             console.log(error)
             this.setState({errors :" Error Status:" +error.response.status + "wrong input parameters"})
        }
   }

       render() { 

        if(this.state.second_render){  
           return ( 
              <React.Fragment>
                 <ul className="SessionsperEVResultList">
                     <li>VehicleID : {this.props.match.params.VehicleID}</li> 
                     <li>RequestTimestamp : {this.state.Sessions.RequestTimestamp }</li>
                     <li>PeriodFrom : {this.state.Sessions.PeriodFrom}</li>
                     <li>PeriodTo : {this.state.Sessions.PeriodΤο}</li>
                     <li>TotalEnergyConsumed : {this.state.Sessions.TotalEnergyConsumed}</li>
                     <li>NumberOfVisitedPoints : {this.state.Sessions.NumberOfVisitedPoints}</li>
                     <li>NumberOfChargingSessions : {this.state.Sessions.NumberOfChargingSessions}</li>
                 </ul>
                <div className="table-wrapper">
                <div className="table-scroll">
                <Table  style={{width:1200,marginLeft:200}}>
                    <thead >
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
                  </div>
                  </div>
                  <div className="PieChart">
                    <Pie
                     data={this.state}
                     options={{
                       title:{
                        display:true,
                        text:'Sessions per 8h partitions in 24h format',
                        fontSize:20
                             },
                       legend:{
                          display:true,
                          position:'right'                  
                         }
                  }}/>
                  </div>     
                </React.Fragment>        
                 );
}
          else{
              if(this.state.errors){
                    return <h1 className="sessionserror">{this.state.errors}</h1>
                         }
              else{
                    return <h1>Waiting Server...</h1>
                          }
   }}
}
 
export default SessionsPerEV;