import { useReducer, useState} from 'react';
import { Modal } from '@material-ui/core';
import './opretafhentning.css'
import React from 'react';
import {addVarerToAfhentning} from '../../service/firebase.service'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';




const ModalBody = (props) => {

    const [vareInformationer, setVareinformationer] = useReducer((value, newValue) => ({...value, ...newValue}), {
        title: '',
        mængdeEnhed: '',
        mængde: '',
       
    })
    const [enhed, setEnhed] = useState([])

    const tilføjVaren = () => {
        
        addVarerToAfhentning(vareInformationer, props.currentAfhentning);
        props.onClose()
        
    }

    const enheder = [
        'Kg',
        'Palle'
    ]

   

    return (

        <Modal  open={props.open}
                onClose={props.onClose}>
            <div className="modalBody">
                <h2 id="simple-modal-title">Opret en vare</h2>
                    <p id="simple-modal-description">
                        Her kan du tilføje en vare til din afhentning
                    </p>
                    <div >
                       <TextField id="standard-basic" label="Varens type" onChange={(e) => setVareinformationer({title: e.target.value})}/> 
                    </div>
                    
                    <FormControl >
                        <InputLabel>MængdeEnhed</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vareInformationer.mængdeEnhed}
                            onChange={(e) => setVareinformationer({mængdeEnhed: e.target.value})}
                        >
                        <MenuItem value={"Kg"} >Kg</MenuItem> 
                        <MenuItem value={"Palle"} >Palle</MenuItem> 
                            
                        </Select>

                    </FormControl>
                    
                    <div>
                        <TextField id="standard-basic" label="Mængde" onChange={(e) => setVareinformationer({mængde: e.target.value})}/>
                    </div>
                   
                    
                
                
                <Button variant="contained" onClick={(e) => tilføjVaren()}>GEM</Button>

        
            </div> 
        </Modal>
        

    )
}

export default ModalBody;

