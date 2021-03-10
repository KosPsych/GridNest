import React , { Component }from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import '../style.css'
import {Pie} from 'react-chartjs-2';


  class SessionsPerProvider extends Component {
      state = { 
         Sessions :[] , 
         second_render :false,
         errors :"",
         labels: ["00:00-06:00","06:00-12:00","12:00-18:00","18:00-14:00"],
         datasets: [
            {
            label: 'Energy per 6h partitions in 24h format',
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#2F4F4F',
              '#597272',
              '#deb887' 
                   ],
            hoverBackgroundColor: [
              'rgba(75,185,185,1)', 
              '#446161',
              '#788d8d',
              '#e0bc8d'
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
          const {data: Sessions}= await axios.get("https://localhost:8765/evcharge/api/SessionsPerProvider/"+this.props.match.params.ProviderID+"/"
            +this.props.match.params.datefrom+"/"+this.props.match.params.dateto,config);
          this.state.second_render=true
          this.setState({Sessions})
          var counter1=0
          var counter2=0
          var counter3=0
          var counter4=0
          for (var i=0; i <Sessions.length; i++){
            var hour=parseInt(Sessions[i].StartedOn.split(" ")[1].substring(0, 2))
            var energy = parseInt(Sessions[i].EnergyDelivered)
            if (hour>=18)
             counter1=counter1+energy
            else if(hour>=12)
              counter2=counter2+energy
            else if(hour>=6) 
              counter3=counter3+energy
            else 
               counter4=counter4+energy
           }
          this.state.datasets[0].data=[counter1,counter2,counter3,counter4]
           } 
        catch (error) {
          console.log(error)
          this.setState({errors :error.response.status  + " " + error.response.data})
                      }
                         }

      
      render() { 

          if(this.state.second_render){   
                return (      
                   <React.Fragment>
                    <ul className="SessionsperProviderResultList">
                         <li>Sessions Per Provider</li>  
                        </ul>    

                 <div className="table-wrapper">
                  <div className="table-scroll">
                   <Table style={{width:1500,marginLeft:50}}>
                       <thead>
                         <tr> 
                           <th>ProviderID</th>
                            <th>ProviderName</th>
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
                              {this.state.Sessions.map(Session => (
                                  <tr key={Session.SessionID}>
                                       <th>{Session.ProviderID}</th>
                                       <th>{Session.ProviderName}</th>
                                       <th>{Session.StationID}</th>
                                       <th>{Session.SessionID}</th>
                                       <th>{Session.VehicleID}</th>
                                       <th>{Session.StartedOn}</th>
                                       <th>{Session.FinishedOn}</th>
                                       <th>{Session.EnergyDelivered}</th>
                                       <th>{Session.CostPerKwh}</th>
                                       <th>{Session.TotalCost}</th>
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
                              text:'Energy Delivered(kWh) per 6h partitions in 24h format',
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
              }
      }
  }
   
  export default SessionsPerProvider;