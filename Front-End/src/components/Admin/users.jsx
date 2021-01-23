import React, { Component } from 'react';
import axios from 'axios'
import '../style.css'
class Users extends Component {
    state = { 
        second_render: false,
        UserData :[],
        errors :""
            }


    async componentDidMount(){

        try {
            const {data: UserData} = await axios({
                method: 'get',
                url: "https://localhost:8765/evcharge/api/admin/users/"+this.props.match.params.username,
                headers: {'x-observatory-auth': localStorage.getItem("token")}
                  });
            this.setState({second_render : true , UserData})
            
        } catch (error) {
            this.setState({errors :  error.response.status + " " + error.response.data})
        }
         
    
                           }

    render() { 
         if (!this.state.second_render){
            if(this.state.errors){
                return <h1>{this.state.errors}</h1>
                     }
              else{
                return <h1 className="result">Waiting Server...</h1>
                  }
         }
         else {
             return (
              <ul className="ResultList">
                <li>Username : {this.state.UserData[0].Username}</li>
                <li>Password : {this.state.UserData[0].Password}</li>
                <li>isAdmin : {this.state.UserData[0].isAdmin}</li>
                <li>FirstName : {this.state.UserData[0].FirstName}</li>
                <li>LastName : {this.state.UserData[0].LastName}</li>
                <li>email : {this.state.UserData[0].email}</li>
              </ul>  
                    );
               }}
}
 
export default Users;