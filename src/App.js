/* eslint-disable default-case */
import './app.css';
import AppLayout from "./components/app";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


function App() {


  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AppLayout>   
          </AppLayout>
      </MuiPickersUtilsProvider>
          
        
    </div>
  );
}

export default App;
