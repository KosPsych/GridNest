import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import MainPage from '../components/mainpage';
import Login from '../components/login';
import NotFound from '../components/NotFound';
import Healthcheck from '../components/Admin/Healthcheck';
import UserModForm from '../components/Forms/AdminUsermodForm';
import GetUserForm from '../components/Forms/AdminGetUserForm';

let container;
let logincontainer;
let notfoundcontainer;
let healthcheckcontainer;
let usermodformcontainer;
let getusercontainer;

beforeEach(() => {
  container = document.createElement('React.Fragment');
  logincontainer = document.createElement('React.Fragment');
  notfoundcontainer = document.createElement('div');
  healthcheckcontainer = document.createElement('div');
  usermodformcontainer = document.createElement('React.Fragment');
  getusercontainer = document.createElement('React.Fragment');
  document.body.appendChild(container);
  document.body.appendChild(logincontainer);
  document.body.appendChild(notfoundcontainer);
  document.body.appendChild(healthcheckcontainer);
  document.body.appendChild(usermodformcontainer);
  document.body.appendChild(getusercontainer);
});

afterEach(() => {
  document.body.removeChild(container);
  document.body.removeChild(logincontainer);
  document.body.removeChild(notfoundcontainer);
  document.body.removeChild(healthcheckcontainer);
  document.body.removeChild(usermodformcontainer);
  document.body.removeChild(getusercontainer);
  container = null;
  logincontainer=null;
  notfoundcontainer=null;
  healthcheckcontainer=null;
  usermodformcontainer=null;
  getusercontainer=null;
});

it('can render components of MainPage', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<MainPage />, container);
  });
  const h1 = container.querySelector('h1');
  const div = container.querySelector('div');
  expect(container).toBeTruthy();
  expect(h1).toBeTruthy();
  expect(div).toBeTruthy();

});


it('can render components of Login', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<Login />, logincontainer);
    });
    const form = logincontainer.querySelector('form');
    const div = logincontainer.querySelector('div');
    const label = logincontainer.querySelector('label');
    expect(logincontainer).toBeTruthy();
    expect(form).toBeTruthy();
    expect(div).toBeTruthy();
    expect(label).toBeTruthy();
  
  });


  it('can render components of NotFound', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<NotFound />, notfoundcontainer);
    });
    expect(notfoundcontainer).toBeTruthy();
  });

  it('can render components of healthcheck', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<Healthcheck />, healthcheckcontainer);
    });

    const h1= healthcheckcontainer.querySelector('h1');
    const button= healthcheckcontainer.querySelector('button');
    expect(healthcheckcontainer).toBeTruthy();
    expect(h1).toBeTruthy();
    expect(button).toBeTruthy();
  });


  it('can render components of admin usermod form', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<UserModForm  />, usermodformcontainer);
    });

    const form= usermodformcontainer.querySelector('form');
    const div= usermodformcontainer.querySelector('div'); 
    const label= usermodformcontainer.querySelector('label'); 
    const input= usermodformcontainer.querySelector('input'); 

    
    expect(usermodformcontainer).toBeTruthy();
    expect(form).toBeTruthy();
    expect(div).toBeTruthy();
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
    
    
  });


  it('can render components of admin getuser form', () => {
    // Test first render and componentDidMount
    act(() => {
      ReactDOM.render(<GetUserForm />, getusercontainer);
    });

    const h1= getusercontainer.querySelector('h1');
    const div= getusercontainer.querySelector('div'); 
    const label= getusercontainer.querySelector('label'); 
    const input= getusercontainer.querySelector('input'); 

    
    expect(getusercontainer).toBeTruthy();
    expect(input).toBeTruthy();
    expect(div).toBeTruthy();
    expect(label).toBeTruthy();
    expect(h1).toBeTruthy();
    
    
  });
