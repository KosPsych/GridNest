import React, { Component } from 'react';
import axios from 'axios'
class Resetsessions extends Component {
    state = { 
       status : "Not Defined"
     }
     resetsessions = async () =>{

        const {data: Response}= await axios.post("https://localhost:8765/evcharge/api/admin/resetsessions")
        
        
        this.setState({status : Response.status})

    }
    render() { 
        return ( 
          <React.Fragment>
           <button onClick={this.resetsessions}>
              Resetsessions
           </button> 
           <h1>Status : {this.state.status} </h1>
          </React.Fragment>
              );
    }
}
 
export default Resetsessions;