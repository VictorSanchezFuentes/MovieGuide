import './App.css';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import routes from './route-config';
import configureValidations from './Validations';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.models';
import AuthenticationContext from './auth/AuthenticationContext';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import LandingPage from './movies/LandingPage';
import { getClaims } from './auth/HandleJWT';

configureValidations();


function App() {

  const [claims, setClaims] = useState<claim[]>([
  //   {name: "email", value: "victor@hotmail.com"},
  //   {name: "role", value: "admin"}

  ]);


  useEffect(() => {
    setClaims(getClaims());
    console.log(claims);
  }, [])




function isAdmin() {
  return claims.findIndex(claims => claims.name === "role"
    && claims.value === "admin") > -1;
  
  }


  // function PrivateRoute(adminCheck: any): ReactElement {
    
  //   console.log(adminCheck);
  //   console.log(!isAdmin());
    
  //   const auth = (!isAdmin() && adminCheck); // determine if authorized, from context or however you're doing it
  
  //   console.log(auth);

  //     // If authorized, return an outlet that will render child elements
  //     // If not, return element that will navigate to login page
  //     return auth ? <>You are not allowed to see this page</> : <LandingPage />;
  // }



  return (

    <Router>
      <AuthenticationContext.Provider value={{claims, update: setClaims}}>
        <Menu />
          <div className='container'>
            <Routes>

                
                {routes.map(route => 
                    //@ts-ignore
                    <Route key={route.path} path={route.path} exact={route.exact} 
                      element={route.isAdmin && !isAdmin() ? <>
                        You are not allowed to see this
                      
                      </> : <route.component />}
                      //remember, if you want to, component is like
                      //element but in "function format"

                      >
                      
                      

                  </Route>
                )}

              </Routes>
          </div>
          <footer className='bd-footer py-5 mt-5 bg-light'>
                  <div className='container'>
                    React Movies {new Date().getFullYear().toString()}


                  </div>
          </footer>
      </AuthenticationContext.Provider>
    </Router>
)

  
}

export default App;





