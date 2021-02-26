import React , { Component }from 'react';
import {Link} from 'react-router-dom';
import '../style.css'
class SessionsForm extends Component {
    state = { 
       ID : "",
       DateFrom : "",
       DateTo : ""
       
     }


  handleChange = event =>{
      this.setState({[event.target.name]: event.target.value});
  };



    render() { 
        return ( 
          <div className="container5">
           <h1 style={{marginLeft:20}}>Insert Parameters</h1>
           <div>
             <form>
                <div>
                 <label style={{marginLeft:20}}>
                  {this.props.CID}:
                  <input type="text" name ={"ID"} value={this.state.ID}  onChange={this.handleChange}/>
                 </label>
                </div>
                <div>
                <label style={{marginLeft:20}}>
                   Date from:
                <input type="date" name="DateFrom" value={this.state.DateFrom}  onChange={this.handleChange}/>
                </label>
                </div>
                <div>
                  <label style={{marginLeft:20}}>
                  Date To:
                  <input type="date" name="DateTo" value={this.state.DateTo}  onChange={this.handleChange}/>
                 </label>
                </div>
                
              </form>
         </div>
         <div>
         <Link className="SessionsLink" to={"/evcharge/api/"+this.props.SessionType+"/"+this.state.ID+"/"+this.state.DateFrom.replace(/-/ig, '')+"/"+this.state.DateTo.replace(/-/ig, '')}>Submit Query</Link>
         </div>
         </div>
         );
    }
}
 
export default SessionsForm;