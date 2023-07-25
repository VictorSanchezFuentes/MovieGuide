import './App.css';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './route-config';
import configureValidations from './Validations';

configureValidations();


function App() {

  return (

    <Router>
      <Menu />
        <div className='container'>
           <Routes>

              
              {routes.map(route =>
                // @ts-ignore
                <Route key={route.path} path={route.path} element={<route.component />}>
                  
                </Route>
              )}

            </Routes>
        </div>
        <footer className='bd-footer py-5 mt-5 bg-light'>
                <div className='container'>
                  React Movies {new Date().getFullYear().toString()}


                </div>
        </footer>
    </Router>
)

  
}

export default App;





