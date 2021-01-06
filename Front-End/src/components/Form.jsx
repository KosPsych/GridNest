import React , { Component }from 'react';
import {Link} from 'react-router-dom';

class Form extends Component {
    state = { 
       stationID : "",
       DateFrom : "",
       DateTo : "",
       format:"json"
     }


  handleChange = event =>{
    
    this.setState({[event.target.name]: event.target.value});
  };



    render() { 
        return ( 
          <React.Fragment>
           <h1>Insert Parameters</h1>
           <div>
             <form onSubmit={this.handleSubmit}>
                <div>
                 <label>
                  Station ID:
                  <input type="text" name ="stationID" value={this.state.StationID} maxLength="4" onChange={this.handleChange}/>
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
                <label>
                  Select format :
                  <select name="format" value={this.state.format} onChange={this.handleChange}>
                    <option value="">-</option>
                     <option  value="json">JSON</option>
                     <option value="csv">CSV</option>
            
                   </select>
                </label>
              </form>
         </div>
         
         <div>
         <Link to={"/evcharge/api/SessionsPerStation/"+this.state.stationID+"/"+this.state.DateFrom.replace(/-/ig, '')+"/"+this.state.DateTo.replace(/-/ig, '')}>Submit Link</Link>
         </div>

         </React.Fragment>
         );
    }
}
 
export default Form;