/* eslint-disable default-case */
import React, { Fragment, useState, useEffect } from "react"
import BotNavigation from "../routing/bottomNavigation"
import HomeScreen from "../sections/home/homeScreen";
import Afhentninger from "../sections/afhentninger/afhentninger";
import Profile from "../sections/profil/profile";
import OpretAfhentning from "../sections/afhentninger/opretafhentning";
import RedigerAfhentning from "../sections/afhentninger/redigerAfhentning";
import SignupPage from "../sections/auth/signupPage"
import LoginPage from "../sections/auth/loginPage"




const AppLayout = (props) => {

    const [value, setValue] = useState(6);

    

    
    //would love to change this routing to react-router
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
            case 5: 
              return <SignupPage value={value} onChange={setValue}/>
            case 6: 
              return <LoginPage value={value} onChange={setValue}/>
          }
    }


    useEffect(() => {

    })

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
