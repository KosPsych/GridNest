import React, { Component } from 'react';
import axios from 'axios'
import '../style.css'
import queryString from 'query-string'
const qs = require('querystring')

class UserMod extends Component {
    state = { 
        second_render: false,
        Response :[]
     }

    async componentDidMount(){

         let form_data=queryString.parse(this.props.location.search)
         console.log(form_data)
         const {data: Response} = await axios({
             method: 'post',
             url: "https://localhost:8765/evcharge/api/admin/usermod/"+this.props.match.params.username+"/"+this.props.match.params.password,
             data: qs.stringify({
              first: form_data.first,
              last: form_data.last,
              email:form_data.email,
              isadmin:form_data.isadmin

            }),
             headers: {'x-observatory-auth': localStorage.getItem("token"),'Content-Type': 'application/x-www-form-urlencoded'}
   
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