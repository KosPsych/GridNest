import React , { Component }from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import '../style.css'
import {Bar} from 'react-chartjs-2';

  class SessionsPerStation extends Component {
      state = { 
         Sessions :[] , 
         second_render :false,
         errors :"",
         labels: [],
         datasets: [
             { 
               label: 'Average Energy',
               backgroundColor: 'rgba(75,192,192,1)',
               borderColor: 'rgba(0,0,0,1)',
               borderWidth: 2,
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
             const {data: Sessions}= await axios.get(
               "https://localhost:8765/evcharge/api/SessionsPerStation/"
               +this.props.match.params.stationID+"/"+this.props.match.params.datefrom+"/"
               +this.props.match.params.dateto , config);
             this.state.second_render=true
             this.setState({Sessions})
             const point_names =[Sessions.SessionsSummaryList[0].PointID]
             const energy_del =[Sessions.SessionsSummaryList[0].EnergyDelivered/Sessions.SessionsSummaryList[0].PointSessions]
             for (var i = 1; i < Sessions.SessionsSummaryList.length; i++) {
              point_names.push(Sessions.SessionsSummaryList[i].PointID)
              energy_del.push(Sessions.SessionsSummaryList[i].EnergyDelivered/Sessions.SessionsSummaryList[i].PointSessions)
              } 
             this.state.labels=point_names
             this.state.datasets[0].data=energy_del
             } 
        catch (error) {
          this.setState({errors :error.response.status  + " " + error.response.data})
        }
    }

       
      render() { 

          if(this.state.second_render){  
             return ( 
                 
                  <React.Fragment>
                     <ul className="SessionsResultList">
                       <li>StationID : {this.props.match.params.stationID}</li>
                       <li>Operator : {this.state.Sessions.Operator}</li>  
                       <li>RequestTimestamp : {this.state.Sessions.RequestTimestamp }</li>
                       <li>PeriodFrom : {this.state.Sessions.PeriodFrom}</li>
                       <li>PeriodTo : {this.state.Sessions.PeriodΤο}</li>
                       <li>TotalEnergyDelivered : {this.state.Sessions.TotalEnergyDelivered}</li>
                       <li>NumberOfActivePoints : {this.state.Sessions.NumberOfActivePoints}</li>
                       <li>NumberOfChargingSessions : {this.state.Sessions.NumberOfChargingSessions}</li>
                     </ul>

                  <div className="table-wrapper">
                  <div className="table-scroll">
                  <Table style={{width:800,marginLeft:390}}>
                    <thead >
                       <tr > 
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
                  </div>
                  </div>
                 
                  <div className="barchart">
                     <Bar 
                       data={this.state}
                       width={100}
                       height={40}
                       //options={{ maintainAspectRatio: false }}
                       options={{
                        title:{
                        display:true,
                        text:'Average Energy Per Session,Per point ',
                         fontSize:20
                             },
                        legend:{
                         display:true,
                        position:'right'
                        }
                        }} />
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
   
  export default SessionsPerStation;