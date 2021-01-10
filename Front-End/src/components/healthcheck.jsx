import React, { Component } from 'react';
import axios from 'axios'
class Healthcheck extends Component {
    state = { 
       status : "Not Defined"
     }
     healthcheck = async () =>{

        const {data: Response}= await axios.get("https://localhost:8765/evcharge/api/admin/healthcheck")
        
        
        this.setState({status : Response.status})

    }
    render() { 
        return ( 
          <React.Fragment>
           <button onClick={this.healthcheck}>
              Healthcheck
           </button> 
           <h1>Status : {this.state.status} </h1>
          </React.Fragment>
              );
    }
}
 
export default Healthcheck;