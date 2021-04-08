/* eslint-disable default-case */
import React, { useState, useEffect } from "react"
import BotNavigation from "../routing/bottomNavigation"
import HomeScreen from "../sections/home/homeScreen";
import Afhentninger from "../sections/afhentninger/afhentninger";
import Profile from "../sections/profil/profile";
import OpretAfhentning from "../sections/afhentninger/opretafhentning";
import RedigerAfhentning from "../sections/afhentninger/redigerAfhentning";


const AppLayout = (props) => {

    const [value, setValue] = useState();
    
    const renderView = () => {
        switch(value) {
            case 0:
              return <HomeScreen value={value} onChange={setValue}/>;
            case 1:
              return <Afhentninger value={value} onChange={setValue}/>
            case 2: 
              return <Profile value={value} onChange={setValue}/>
            case 3: 
              return <OpretAfhentning value={value} onChange={setValue}/>
            case 4:
              return <RedigerAfhentning value={value} onChange={setValue}/>
           
          }
    }


    useEffect(() => {

      setValue(props.value)
    },[] )

    return (
        <>
          <div className="content-container">
            {renderView()}
          </div>
          <BotNavigation value={value} onChange={setValue} />
        </>  
        
    )
    
}

export default AppLayout;
