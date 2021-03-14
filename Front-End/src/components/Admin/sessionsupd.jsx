import React, { Component } from 'react';
import axios from 'axios'
import FormData from 'form-data'
import '../style.css'
const fs = require('fs');

const request = require('request');


class SessionsUpdate extends Component {
    state = { 
        second_render: false,
        selectedFile: null,
        QueryResult : [],
        errors : ""
            }

           
      handleSubmit = async (event) => {
         event.preventDefault();
         let formData = new FormData();
         formData.append('file', this.state.selectedFile);
         try {
         const {data : QueryResult} = await axios({
          method: 'post',
          url: "https://localhost:8765/evcharge/api/admin/system/sessionsupd",data: formData,
          headers: {'x-observatory-auth': localStorage.getItem("token")},  
          });

          this.setState({second_render : true ,QueryResult})

          } catch (error) {
              this.setState({errors :error.response.status  +" "+error.response.data})
                     } 
                                     }   
        
      onFileChange = async event => {
                     this.setState({ selectedFile : event.target.files[0]}); 
                                    }; 

    render() { 
         if (!this.state.second_render){
         return  (
            <React.Fragment>
            <form onSubmit={this.handleSubmit} className="sessionsupd">
               <div>
                 <h1 className="sessionsupdheader">Upload a file</h1>
               </div>   
               <div>     
                 <fieldset style={{marginTop:40,marginLeft:130}}>
                   <input type="file"  accept=".csv" onChange={this.onFileChange}/>
                 </fieldset>
               </div> 
                    <input style={{width:120,backgroundColor:'white',marginTop:20,marginLeft:130}} type="submit" value="Submit" />
            </form>
            { this.state.errors && <h1 className="error">{this.state.errors}</h1>}
            </React.Fragment>
         ); }
         else {
             return (
               <div className="Sessionsimportreturn">
              <ul >
                <li>SessionsImported : {this.state.QueryResult.SessionsImported}</li>
                <li>SessionsInUploadedFile : {this.state.QueryResult.SessionsInUploadedFile}</li>
                <li>TotalSessionsInDatabase : {this.state.QueryResult.TotalSessionsInDatabase}</li>
              </ul>  
              </div>
                    );
               }}
}
 
export default SessionsUpdate;