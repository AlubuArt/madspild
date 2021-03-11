import {useEffect, useReducer} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Grid, Modal } from '@material-ui/core';
import './opretafhentning.css'
import VareLinje from './vareLinje';
import React from 'react';



const ModalBody = (props) => {

    const [vareInformationer, setVareinformationer] = useReducer((value, newValue) => ({...value, ...newValue}), {
        title: '',
        mængdeenhed: '',
        mængde: '',
        tidsrum: ''
    })

    const saveVareinformationer = () => {
        console.log(vareInformationer)
        //TODO: kald til service laget, som snakkker med databasen
        
    }

    return (

        <Modal 
            
            open={props.open}
            onClose={props.onClose}>

           <div className="modalBody">
            <h2 id="simple-modal-title">Opret en vare</h2>
                <p id="simple-modal-description">
                    Her kan du tilføje en vare til din afhentning
                </p>
            <form>
                <label>Varens type</label>
                <input onChange={(e) => setVareinformationer({title: e.target.value})}></input>
            </form>
            <form>
                <label>Mængde enhed</label>
                <input onChange={(e) => setVareinformationer({mængdeenhed: e.target.value})}></input>
            </form>
            <form>
                <label>Mængde</label>
                <input onChange={(e) => setVareinformationer({mængde: e.target.value})}></input>
            </form>
            <form>
                <label>Tidsrum for afhentning</label>
                <input onChange={(e) => setVareinformationer({tidsrum: e.target.value})}></input>
            </form>
            <button onClick={saveVareinformationer}>GEM</button>

      
        </div> 
        </Modal>
        

    )
}

export default ModalBody;

