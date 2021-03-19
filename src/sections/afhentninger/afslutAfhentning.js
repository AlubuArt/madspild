import { useReducer} from 'react';
import { Modal } from '@material-ui/core';
import './opretafhentning.css'
import React from 'react';
import { useState } from "react";
import { DateTimePicker} from "@material-ui/pickers";
import {setAfhentningToActive} from '../../service/firebase.service';

const getToday = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

const AfslutModal = (props) => {

    const [afhentesFra, setAfhentesFra] = useState(new Date("2021-01-01T00:00:00.000Z"));
    const [afhentesTil, setAfhentesTil] = useState(new Date("2021-01-01T00:00:00.000Z"));
    const [afhentningsInformation, setAfhentningsInformation] = useReducer((value, newValue) => ({...value, ...newValue}), {
        afhentningssted: '',
        aktiv: true,
        booketStatus: 'ikke booket',
        kontaktPerson: '',
        leverandør: '',
        tidsrumFra: afhentesFra,
        tidsrumTil: afhentesTil

    })

    

    
    const afslut = () => {
        setAfhentningsInformation(afhentningsInformation)
        setAfhentningToActive(props.currentAfhentning, afhentningsInformation)
        alert("afhentningen blev oprettet")
        props.onClose()
        props.close()
    }

    return (
        <Modal  open={props.open}
                onClose={props.onClose}>
            <div className="modalBody">
                <h2 id="simple-modal-title">{props.modalTitle}</h2>
                    <p id="simple-modal-description">
                        Indtast de sidste oplysninger, før du færdiggør afhentningen
                    </p>
                <form>
                    <input placeholder="Leverandørnavn"  onChange={(e) => setAfhentningsInformation({leverandør: e.target.value})} ></input>
                </form>
                <form>
                    <input placeholder="Kontaktperson" onChange={(e) => setAfhentningsInformation({kontaktPerson: e.target.value})}></input>
                </form>
                <form>
                    <input placeholder="Afhentningssted"  onChange={(e) => setAfhentningsInformation({afhentningssted: e.target.value})}></input>
                </form>
                <form>
                
                <DateTimePicker
                    variant="inline"
                    label="Afhentes fra"
                    value={afhentesFra}
                    onChange={setAfhentesFra}  
                />
                </form>
                <form>
                    
                <DateTimePicker
                    variant="inline"
                    label="Afhentes indtil"
                    value={afhentesTil}
                    onChange={setAfhentesTil}
                />
                </form>
                
                <button onClick={(e) => afslut()}>GEM</button>
            </div> 
        </Modal>
    )
}


export default AfslutModal;
