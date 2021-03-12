import React , { Component }from 'react';
import './style.css'
  class MainPage extends Component {
      state = { 
         
      }
      render() { 
          return (
          
           
        <React.Fragment>
        <h1 className="GoElectric">Go Electric</h1>
        <h1 className="GoEverywhere">Go Everywhere</h1>
        <div className="row">
           <div className="column">
           <img className="leftImage" alt=""/>
        </div>
        <div className="column">
          <img className="RightImage" alt=""/>
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