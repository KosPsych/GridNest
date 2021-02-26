import React , { Component } from "react"
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import '../style.css'
import {Pie} from 'react-chartjs-2';
 
class SessionsPerPoint extends Component {
    state = { 
        Sessions :[] , 
        second_render :false,
        errors : "",
        labels: ["phev","bev"],
         datasets: [
          {
            label: 'Car Types',
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#2F4F4F'
            ],
            hoverBackgroundColor: [
            'rgba(75,150,150,1)',
            '#446161'
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
          }}   
          
        try {
          const {data: Sessions}= await axios.get("https://localhost:8765/evcharge/api/SessionsPerPoint/"+this.props.match.params.PointID+"/"
          +this.props.match.params.datefrom+"/"+this.props.match.params.dateto,config);
          this.state.second_render=true
          this.setState({Sessions})
          var phev=0
          var bev=0
          for (var i=0;  i<Sessions.ChargingSessionsList.length; i++){
             if (Sessions.ChargingSessionsList[i].VehicleType=="phev"){
              phev=phev+1
             }
             else{
               bev=bev+1;
             }
                }             
          this.state.datasets[0].data=[phev,bev]
           } 
        catch (error) {
          this.setState({errors :" Error Status:" +error.response.status + "wrong input parameters"})
                      }
       }

       render() { 
        if(this.state.second_render){  
          return ( 
              <React.Fragment>
                <ul className="SessionsPointResultList">
                 <li>PointID : {this.props.match.params.PointID}</li>
                 <li>Point Operator : {this.state.Sessions.PointOperator}</li>  
                 <li>RequestTimestamp : {this.state.Sessions.RequestTimestamp }</li>
                 <li>PeriodFrom : {this.state.Sessions.PeriodFrom}</li>
                 <li>PeriodTo : {this.state.Sessions.PeriodΤο}</li>
                 <li>NumberOfChargingSessions : {this.state.Sessions.NumberOfChargingSessions}</li>
                </ul>
                <div className="table-wrapper">
                  <div className="table-scroll">
                <Table style={{width:1200,marginLeft:200}}>
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
                  </div>
                  </div>
                  <div className="PieChart">
                    <Pie
                      data={this.state}
                      options={{
                       title:{
                       display:true,
                       text:'Car Types',
                       fontSize:20
                         },
                       legend:{
                       display:true,
                       position:'right'
                          }}}/>
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
 
export default SessionsPerPoint;