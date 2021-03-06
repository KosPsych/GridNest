import React , { Component }from 'react';
import './style.css'
  class MainPage extends Component {
      state = { 
         
      }
      render() { 
          return (
          
           
        <React.Fragment>
        <h1>Main Page</h1>
        <div class="row">
           <div class="column">
           <img className="leftImage"/>
        </div>
        <div class="column">
          <img className="RightImage"/>
         </div>
        </div>

        <div className="Contactcontainer">
            <p className="contactus">Contact Us</p>   
         <h1 className="address">Address:9, Iroon Polytechniou St,Athens</h1> 
         <h1 className="postalcode">Postal Code : 15780</h1> 
         <h1 className="email">Email: info@gridnest.gr</h1> 

        </div>
        </React.Fragment>
        
        
        );
      }
  }
   
  export default MainPage ;