import React, { Component } from 'react';
import '../style.css'

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
        <form onSubmit={this.handleSubmit} className="container4">
            <div>
                <h1 className="headermod">Enter Username</h1>
            </div>   
            <div>  
              <label className="AdminGetInputLabel">
                 Username:
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
              </label>
            </div> 
            <input style={{width:120,backgroundColor:'white',marginTop:20,marginLeft:110}} type="submit" value="Submit" />
         </form>
       );
    }
}
 
export default GetUserForm;