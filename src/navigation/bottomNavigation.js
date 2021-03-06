import React from 'react'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {Home, ListAlt, AccountBox } from '@material-ui/icons'


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'rgba(65, 183, 57, 0.76)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  label: {
    textTransform: 'capitalize',
  },
  
  item: {
          color: 'rgb(5 72 0 / 76%)',
          "&$selected": {
              color: "white"
          }
           
  },
  selected: {
      
  }
  
});

const BotNavigation = ( {value, onChange}) => {

    const classes = useStyles();


    return (
        <BottomNavigation classes={{root: classes.root}} value={value} onChange={(e, tab) => onChange(tab)} showLabels={true}>
            <BottomNavigationAction classes={{root: classes.item, selected: classes.selected}} label="Opret donation" icon={<Home />} ></BottomNavigationAction>
            <BottomNavigationAction classes={{root: classes.item, selected: classes.selected}} label="Vores donationer"  icon={<ListAlt  />}></BottomNavigationAction>
            <BottomNavigationAction classes={{root: classes.item, selected: classes.selected}} label="Virksomhedsprofil" icon={<AccountBox />}></BottomNavigationAction>
        </BottomNavigation>
    )
}

export default BotNavigation;
