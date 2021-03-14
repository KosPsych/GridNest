import React, { Component } from 'react';
import axios from 'axios'
import '../style.css'
class Resetsessions extends Component {
    state = { 
       status : "Not Defined"
     }
     resetsessions = async () =>{


        const {data: Response} = await axios({
            method: 'post',
            url: "https://localhost:8765/evcharge/api/admin/resetsessions",
            headers: {'x-observatory-auth': localStorage.getItem("token")}
  
              });
        
        
        this.setState({status : Response.status})

    }
    render() { 
        return ( 
          <div className="container2">
           <h1 className="result2">Status : {this.state.status} </h1>  
           <button style={{width:170,backgroundColor:'white',marginTop:30,marginLeft:90}} onClick={this.resetsessions}>
              Resetsessions
           </button> 
           
          </div>
              );
    }
}
 
export default Resetsessions;