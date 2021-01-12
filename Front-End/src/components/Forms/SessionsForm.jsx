import React , { Component }from 'react';
import {Link} from 'react-router-dom';

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
          <React.Fragment>
           <h1>Insert Parameters</h1>
           <div>
             <form>
                <div>
                 <label>
                  {this.props.CID}:
                  <input type="text" name ={"ID"} value={this.state.ID}  onChange={this.handleChange}/>
                 </label>
                </div>
                <div>
                <label>
                   Date from:
                <input type="date" name="DateFrom" value={this.state.DateFrom}  onChange={this.handleChange}/>
                </label>
                </div>
                <div>
                  <label>
                  Date To:
                  <input type="date" name="DateTo" value={this.state.DateTo}  onChange={this.handleChange}/>
                 </label>
                </div>
                
              </form>
         </div>
         
         <div>
         <Link to={"/evcharge/api/"+this.props.SessionType+"/"+this.state.ID+"/"+this.state.DateFrom.replace(/-/ig, '')+"/"+this.state.DateTo.replace(/-/ig, '')}>Submit Link</Link>
         </div>

         </React.Fragment>
         );
    }
}
 
export default SessionsForm;