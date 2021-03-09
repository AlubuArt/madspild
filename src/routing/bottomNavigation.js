import React from 'react'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {Home, ListAlt, AccountBox } from '@material-ui/icons'


const BotNavigation = ( {value, onChange}) => {



    return (
        <BottomNavigation value={value} onChange={(e, tab) => onChange(tab)} showLabels={true}>
            <BottomNavigationAction label="Hjem" icon={<Home />}></BottomNavigationAction>
            <BottomNavigationAction label="Afhentninger" icon={<ListAlt />}></BottomNavigationAction>
            <BottomNavigationAction label="Profil" icon={<AccountBox />}></BottomNavigationAction>
        </BottomNavigation>
    )
}

export default BotNavigation;
