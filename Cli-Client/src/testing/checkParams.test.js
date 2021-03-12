
 const checkParams = require('../utils/checkParams.js');

 test('test login', () => {
   expect(checkParams('login', 'name')).toBe(true);
  });

 test('test login', () => {
    expect(checkParams('login','name','passw')).toBe(false);
  });

  test('test logout', () => {
    expect(checkParams('logout')).toBe(true);
  });
  
  test('test logout', () => {
      expect(checkParams('logout','name','passw')).toBe(false);
    });  

  test('test usermod', () => {
    expect(checkParams('usermod','param1','param2')).toBe(true);
  });
  
  test('test usermod', () => {
      expect(checkParams('usermod','param1','param2','param3')).toBe(false);
    });    
  
  test('test users', () => {
      expect(checkParams('users','param1')).toBe(true);
    });
    
  test('test users', () => {
        expect(checkParams('users','param1','param2','param3')).toBe(false);
      }); 

  test('SessionsPerPoint', () => {
      expect(checkParams('SessionsPerPoint','param1','param2','param3')).toBe(true);
    }); 
    
  test('SessionsPerEv', () => {
     expect(checkParams('SessionsPerEv','param1','param2','param3','param4','param5')).toBe(false);
    });
    
    
  test('SessionsPerEv', () => {
      expect(checkParams('SessionsPerEv','param1','param3')).toBe(true);
    }); 
    
  test('SessionsPerEv', () => {
     expect(checkParams('SessionsPerEv','param1','param2','param3','param4','param5')).toBe(false);
    });
  
  test('SessionsPerPoint', () => {
      expect(checkParams('SessionsPerPoint','param1','param3')).toBe(true);
    });
  test('SessionsPerPoint', () => {
      expect(checkParams('SessionsPerPoint','param1','param2','param3')).toBe(true);
    });   
    
  test('SessionsPerPoint', () => {
     expect(checkParams('SessionsPerPoint','param1','param2','param3','param4','param5')).toBe(false);
    });  