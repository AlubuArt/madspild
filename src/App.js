/* eslint-disable default-case */
import {useState, useEffect} from 'react';
import './app.css';
import AppLayout from "./components/app";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LoginPage from './sections/auth/loginPage';
import SignupPage from './sections/auth/signupPage';
import Profile from './sections/profil/profile';
import { BrowserRouter,  Switch, Route,Redirect} from 'react-router-dom';
import {firebase_app} from '../src/service/firebase.config';


function App() {

  const [currentUser, setCurrentUser] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [value, setValue] = useState(0);

  useEffect(() => {
    firebase_app.auth().onAuthStateChanged(setCurrentUser);
  }, [])

  return (


    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter baseName={'/'}>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage} />
            <Route path={`${process.env.PUBLIC_URL}/opret-bruger`} component={SignupPage} />
            

            {currentUser !== null ?

            <>
              <Route path={`${process.env.PUBLIC_URL}/velkommen`} render={() => <AppLayout value={0} />} />
              <Route path={`${process.env.PUBLIC_URL}/profil`} render={() => <AppLayout value={2} />} />
              </>
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
