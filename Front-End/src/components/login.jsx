import React, { Component } from 'react';
import axios from 'axios'
import './style.css'


class Login extends Component {
    state = { 
        username :"",
        password :"",
        errors : {}
     }

     handleChange = event =>{ 
        
        this.setState({[event.target.name]: event.target.value});
      };

      handleSubmit = async (event) =>{
             event.preventDefault();
              try {
                const name = this.state.username
                const pass = this.state.password
                const {data:jwt} = await axios({
                  method: 'post',
                  url: "https://localhost:8765/evcharge/api/login",
                
                  data: {
                    username : name, 
                     password : pass
                  }
                });
              
                window.location='/'
                localStorage.setItem("token",jwt.user_access_token)
                
                
              } catch (error) {
                console.log(error)
                
             }             
      };


    render() { 
      
        return ( 
              
            <form onSubmit={this.handleSubmit}>
             <div>
                  <h1 className="result">Login</h1>
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
 
export default Login;