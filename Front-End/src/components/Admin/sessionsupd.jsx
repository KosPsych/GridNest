import React, { Component } from 'react';
import axios from 'axios'
import FormData from 'form-data'
class SessionsUpdate extends Component {
    state = { 
        second_render: false,
        selectedFile: null,
        QueryResult : []
            }

           
      handleSubmit = async (event) => {
         event.preventDefault();
         let formData = new FormData();
         formData.append('file', this.state.selectedFiles);
         const {data : QueryResult} = await axios({
             method: 'post',
             url: "https://localhost:8765/evcharge/api/admin/system/sessionsupd",formData,
             headers: {'x-observatory-auth': localStorage.getItem("token")},  
             });
        this.setState({second_render : true ,QueryResult})
    
            }       


            onFileChange = async event => {
                    this.setState({ selectedFile : event.target.files[0]}); 
                             }; 

    render() { 
         if (!this.state.second_render){
         return  (
            <form onSubmit={this.handleSubmit}>
               <div>
                 <h1>Choose a file to store</h1>
               </div>   
               <div>     
                 <fieldset>
                   <input type="file"  accept=".csv" onChange={this.onFileChange}/>
                 </fieldset>
               </div> 
                    <input type="submit" value="Submit" />
            </form>
         ); }
         else {
             return (
              <ul>
                <li>SessionsImported : {this.state.QueryResult.SessionsImported}</li>
                <li>SessionsInUploadedFile : {this.state.QueryResult.SessionsInUploadedFile}</li>
                <li>TotalSessionsInDatabase : {this.state.QueryResult.TotalSessionsInDatabase}</li>
              </ul>  
                    );
               }}
}
 
export default SessionsUpdate;