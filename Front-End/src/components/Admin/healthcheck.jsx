import React, { Component } from 'react';
import axios from 'axios'
import '../style.css'
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
            <div className="container2">
           <button  style={{width:170,backgroundColor:'white',marginTop:50,marginLeft:90}} onClick={this.healthcheck}>
              Healthcheck
           </button> 
           <h1 className="result2">Status : {this.state.status} </h1>
           </div>
              );
    }
}
 
export default Healthcheck;