import React, { Component } from 'react';
import '../style.css'

class UserModForm extends Component {
    state = { 
       username :"",
       password :"",
       first:undefined,
       last:undefined,
       email:undefined,
       isadmin:undefined,
     }

 
     handleSubmit =()=>{
        let url='/evcharge/api/admin/usermod/'+this.state.username+"/"
               +this.state.password+"?first="+this.state.first
               +"&last="+this.state.last
               +"&email="+this.state.email
               +"&isadmin="+this.state.isadmin

        this.props.history.push(url);

     }

     handleChange = event =>{
        this.setState({[event.target.name]: event.target.value});
      };

    
    render() { 


     
      return ( 
       
        <form onSubmit={this.handleSubmit} className="container3">
            <div>
                <h1 className="headermod">Enter user Information</h1>
            </div>   
            <div>  
              <label className="AdminModInputLabel">
                 Username:
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
              </label>
            </div> 
            <div> 
              <label className="AdminModInputLabel">
                Password:
                <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
              </label>
            </div>
            <div> 
              <label className="AdminModInputLabel2">
                Firstname(*):
                <input type="text" name="first" value={this.state.first} onChange={this.handleChange}/>
              </label>
            </div>
            <div> 
              <label className="AdminModInputLabel2">
                Lastname(*):
                <input type="text" name="last" value={this.state.last} onChange={this.handleChange}/>
              </label>
            </div>
            <div> 
              <label className="AdminModInputLabel">
                E-mail(*):
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
              </label>
            </div> 
            <div> 
              <label className="AdminModInputLabel3">
                isAdmin(*):
                <input type="text" name="isadmin" value={this.state.isadmin} onChange={this.handleChange}/>
              </label>
            </div> 
                <input style={{width:120,backgroundColor:'white',marginTop:20,marginLeft:130}} type="submit" value="Submit" />
         </form>
        
       );
      
      
    }
}
 
export default UserModForm;