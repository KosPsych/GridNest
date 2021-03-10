import React, { Component } from 'react';
import axios from 'axios'
import './style.css'


class Login extends Component {
    state = { 
        username :"",
        password :"",
        errors : ""
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
                this.setState({errors :error.response.status  +" "+error.response.data})
                
             }             
      };


    render() { 
      
        return ( 
           <React.Fragment>
            <div className="container">
            <form onSubmit={this.handleSubmit}>
             <div >
                  <h1 className="Login">Login</h1> {/*className="result" */}
             </div>   
             <div>  
            <label className="inputLabel"> {/*className="inputLabel" */}
              Username:
              <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            </label>
            </div> 
            <div> 
            <label className="inputLabel">  {/*className="inputLabel" */}
              Password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            </div> 
            <input style={{width:120,backgroundColor:'white',marginTop:20,marginLeft:100}} type="submit" value="Submit" /> 
            
          </form>
          
          </div> 
          { this.state.errors && <h1 className="error">{this.state.errors}</h1>}
          </React.Fragment>
          
        );
    }
}
 
export default Login;