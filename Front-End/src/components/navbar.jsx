import React from 'react';
import {Link ,NavLink} from "react-router-dom";
import './style.css'
//navbar navbar-expand-lg navbar-light bg-dark
const NavBar = ({ user }) => {
    return  <nav className ="navbar navbar-expand-sm bg-dark navbar-dark">
              <Link className ="logo" to="/evcharge/api" >GridNest</Link>
              <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className ="navbar-toggler-icon"></span>
              </button>
              <div className ="collapse navbar-collapse" id="navbarNav">
                    <ul className ="navbar-nav">
                       <li className ="nav-item ">
                          <NavLink className ="nav-link" to="/evcharge/api" style={{marginLeft:20}}>Home <span className ="sr-only">(current)</span></NavLink>
                       </li>
                      {user && (user.isAdmin!==0) && <li className ="nav-item dropdown">     
                          <Link className ="nav-link dropdown-toggle" to="/evcharge/api" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Admin Actions
                          </Link>
                      <div className ="dropdown-menu" aria-labelledby="navbarDropdown">
                          <Link className ="dropdown-item" to="/evcharge/api/admin/usermod">User modification</Link>
                          <Link className ="dropdown-item" to="/evcharge/api/admin/users">Get User</Link>
                          <Link className ="dropdown-item" to="/evcharge/api/admin/system/sessionsupd">Sessions update</Link>
                          <Link className ="dropdown-item" to="/evcharge/api/admin/resetsessions">Resetsessions</Link>
                      </div>
                      </li> }
                       {user && <li className ="nav-item dropdown">     
                            <Link className ="nav-link dropdown-toggle" to="/evcharge/api" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Sessions
                            </Link>
                            <div className ="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className ="dropdown-item" to="/evcharge/api/SessionsPerPoint">SessionsPerPoint</Link>
                                <Link className ="dropdown-item" to="/evcharge/api/SessionsPerStation">SessionsPerStation</Link>
                                <Link className ="dropdown-item" to="/evcharge/api/SessionsPerEV">SessionsPerEV</Link>
                                <Link className ="dropdown-item" to="/evcharge/api/SessionsPerProvider">SessionsPerProvider</Link>
                            </div>
                         </li> }
                         <li className ="nav-item ">
                            <NavLink className ="nav-link" to="/evcharge/api/admin/resetsessions">Healthcheck<span className ="sr-only">(current)</span></NavLink>
                        </li>
                      
                        {!user && <li className ="nav-item ">
                            <NavLink className ="nav-link" to="/evcharge/api/login">Login <span className ="sr-only">(current)</span></NavLink>
                        </li>}
                        {user && <li className ="nav-item ">
                            <NavLink className ="nav-link" to="/evcharge/api/">{user.Username}<span className ="sr-only">(current)</span></NavLink> 
                        </li>}
                       {user &&<li className ="nav-item ">
                            <NavLink className ="nav-link" to="/evcharge/api/logout">Logout <span className ="sr-only">(current)</span></NavLink> 
                        </li> }
                      </ul>
                  </div>
              </nav> ;
}
 
export default NavBar;
