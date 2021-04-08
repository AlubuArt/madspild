/* eslint-disable default-case */
import {useState, useEffect} from 'react';
import './app.css';
import AppLayout from "./components/app";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LoginPage from './sections/auth/loginPage';
import SignupPage from './sections/auth/signupPage'
import { BrowserRouter,  Switch, Route,Redirect} from 'react-router-dom';


function App() {

  const [currentUser, setCurrentUser] = useState(localStorage.getItem('userID'))
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated"))
  const [value, setValue] = useState(0);

  

  return (


    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter baseName={'/'}>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage} />
            <Route path={`${process.env.PUBLIC_URL}/opret-bruger`} component={SignupPage} />

            {currentUser !== null || authenticated ?
              <Route path={`${process.env.PUBLIC_URL}/velkommen`} component={AppLayout} />

              :

              <Redirect to={`${process.env.PUBLIC_URL}/login`}/>
              }
          </Switch>
        </BrowserRouter>
         
      </MuiPickersUtilsProvider>
          
        
    </div>
  );
}

export default App;
