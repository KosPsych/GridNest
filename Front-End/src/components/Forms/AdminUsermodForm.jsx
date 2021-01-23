import React, { Component } from 'react';
import '../style.css'

class UserModForm extends Component {
    state = { 
       username :"",
       password :""
     }


     handleSubmit =()=>{
        this.props.history.push('/evcharge/api/admin/usermod/'+this.state.username+"/"+this.state.password);

     }

     handleChange = event =>{
        this.setState({[event.target.name]: event.target.value});
      };

    
    render() { 
        return ( 
        <form onSubmit={this.handleSubmit}>
            <div>
                <h1 className="result">Enter User Information</h1>
            </div>   
            <div>  
              <label className="inputLabel">
                 Username:
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
              </label>
            </div> 
            <div> 
              <label className="inputLabel">
                Password:
                <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
              </label>
            </div> 
                <input style={{width:120,backgroundColor:'white',marginTop:20,marginLeft:740}} type="submit" value="Submit" />
         </form>
       );
    }
}
 
export default UserModForm;