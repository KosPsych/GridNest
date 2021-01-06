import React , { Component }from 'react';
import axios from 'axios';
  class See extends Component {
      state = { 
         posts :[]

       }
       
       async componentDidMount(){
           const {data: posts}= await axios.get("http://localhost:8765/evcharge/api/SessionsPerStation/"+this.props.match.params.stationID+"/"+this.props.match.params.datefrom+"/"+this.props.match.params.dateto);
           this.setState({posts});
       }
      render() { 
        
          return ( 
          <React.Fragment>
          <h1>1 {this.props.match.params.datefrom}</h1>
          <h1>2 {this.props.match.params.dateto}</h1>
          <h1>3 {this.props.match.params.stationID}</h1>
          
          </React.Fragment>
          
          );
      }
  }
   
  export default See;