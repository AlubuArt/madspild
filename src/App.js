/* eslint-disable default-case */
import {useState, useEffect} from 'react';
import './app.css';
import AppLayout from "./components/app";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LoginPage from './sections/auth/loginPage';
import SignupPage from './sections/auth/signupPage';
import { BrowserRouter,  Switch, Route,Redirect} from 'react-router-dom';
import {firebase_app} from '../src/service/firebase.config';


function App() {

  const [currentUser, setCurrentUser] = useState(localStorage.getItem("userID"))
  

  useEffect(() => {
   firebase_app.auth().onAuthStateChanged(setCurrentUser);
  }, [])

  return (


    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter basename="/">
          <Switch>

            <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage} />
            <Route path={`${process.env.PUBLIC_URL}/opret-bruger`} component={SignupPage} />

            { currentUser !== null ?

              <>
              <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                return (<Redirect to={`${process.env.PUBLIC_URL}/velkommen`}/>) 
              }} />

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
