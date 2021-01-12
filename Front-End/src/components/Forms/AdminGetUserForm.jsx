import React, { Component } from 'react';

class GetUserForm extends Component {
    state = { 
       username :"",
           }


     handleSubmit =()=>{
        this.props.history.push('/evcharge/api/admin/users/'+this.state.username);
     }

     handleChange = event =>{
        this.setState({[event.target.name]: event.target.value});
      };

    
    render() { 
        return ( 
        <form onSubmit={this.handleSubmit}>
            <div>
                <h1>Enter Username</h1>
            </div>   
            <div>  
              <label>
                 Username:
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
              </label>
            </div> 
            <input type="submit" value="Submit" />
         </form>
       );
    }
}
 
export default GetUserForm;