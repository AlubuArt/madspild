/* eslint-disable default-case */
import React, { Fragment, useState } from "react"
import BotNavigation from "../routing/bottomNavigation"
import HomeScreen from "../sections/home/homeScreen";
import Afhentninger from "../sections/afhentninger/afhentninger";
import Profile from "../sections/profil/profile";
import OpretAfhentning from "../sections/afhentninger/opretafhentning";





const AppLayout = (props) => {

    const [value, setValue] = useState(0)

    const renderView = () => {
        switch(value) {
            case 0:
              return <HomeScreen value={value} onChange={setValue}/>;
            case 1:
              return <Afhentninger />
            case 2: 
              return <Profile />
            case 3: 
              return <OpretAfhentning />
          }
    }

    return (
        
            
            <div className="page-wrapper">
                <div className="content-container">
                   {renderView()}
                </div>
                <BotNavigation  value={value} onChange={setValue} />
            </div>
        
    )
    
}

export default AppLayout;
