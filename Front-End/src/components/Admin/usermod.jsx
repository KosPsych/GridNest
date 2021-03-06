import React, { Component } from 'react';
import axios from 'axios'
import '../style.css'
class UserMod extends Component {
    state = { 
        second_render: false,
        Response :[]
     }


    async componentDidMount(){
         const {data: Response} = await axios({
             method: 'post',
             url: "https://localhost:8765/evcharge/api/admin/usermod/"+this.props.match.params.username+"/"+this.props.match.params.password,
             headers: {'x-observatory-auth': localStorage.getItem("token")}
   
               });
         this.setState({second_render : true , Response})
    
                           }

    render() { 
        if (!this.state.second_render){
        return  <h1 className="result">Waiting server response..</h1> 
        }
        else {
          if(this.state.Response.message){
             return <h1 className="result">User Updated</h1>
          }
          else{
             return <h1 className="result">User Added</h1>
              }  
            }}
}
 
export default UserMod;