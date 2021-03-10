import {useState} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './home.css'
import {Container} from '@material-ui/core';
import OpretAfhentning from '../afhentninger/opretafhentning';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter,
    useHistory
  } from "react-router-dom";


const HomeScreen = ({value, onChange}) => {
   
    return (
        <>
       <BrowserRouter>
        <Switch>
            <Route exaxt path={"/opret"} component={OpretAfhentning} />
        </Switch>
       </BrowserRouter>
            <Container fluid="true">
           
                <div className="home-main-container">
                    <div className="add-container">
                        <Fab onClick={() => onChange(3)} aria-label="add">
                            <AddIcon />
                        </Fab>
                        <p>Ny afhentning</p>
                    </div>
                </div>
                
            </Container>
         </>
    )
}



export default HomeScreen;