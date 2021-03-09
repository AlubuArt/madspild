/* eslint-disable default-case */
import React, {useState} from 'react';
import BotNavigation from './routing/bottomNavigation';
import HomeScreen from './sections/home/homeScreen';
import Afhentninger from './sections/afhentninger/afhentninger';
import Profile from './sections/profil/profile';
import {Grid} from '@material-ui/core';
import './app.css';






function App() {

  const [tab, setTab] = useState(0)

  const renderView = () => {

    switch(tab) {
      case 0:
        return <HomeScreen />;
      case 1:
        return <Afhentninger />
      case 2: 
        return <Profile />
    }
  }

  return (
    <div className="App">
     <Grid container direction= "column">
       <div className="content-container">
         {renderView()}
       </div>
        <BotNavigation  value={tab} onChange={setTab} />
      </Grid>
      
    </div>
  );
}

export default App;
