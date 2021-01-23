import React, { Component } from 'react';
import axios from 'axios'
import FormData from 'form-data'
import '../style.css'
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
                 <h1 className="result">Choose a  csv file to store</h1>
               </div>   
               <div>     
                 <fieldset style={{marginTop:20,marginLeft:740}}>
                   <input type="file"  accept=".csv" onChange={this.onFileChange}/>
                 </fieldset>
               </div> 
                    <input style={{width:120,backgroundColor:'white',marginTop:20,marginLeft:740}} type="submit" value="Submit" />
            </form>
         ); }
         else {
             return (
              <ul style={{marginTop:30}}>
                <li>SessionsImported : {this.state.QueryResult.SessionsImported}</li>
                <li>SessionsInUploadedFile : {this.state.QueryResult.SessionsInUploadedFile}</li>
                <li>TotalSessionsInDatabase : {this.state.QueryResult.TotalSessionsInDatabase}</li>
              </ul>  
                    );
               }}
}
 
export default SessionsUpdate;