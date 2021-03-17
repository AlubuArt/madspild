import { useReducer} from 'react';
import { Modal } from '@material-ui/core';
import './opretafhentning.css'
import React from 'react';
import { useState } from "react";
import { DateTimePicker} from "@material-ui/pickers";
import {setAfhentningToActive} from '../../service/firebase.service'


const RedigerModal = (props) => {

    const [afhentesFra, setAfhentesFra] = useState(Date.parse(props.data.afhentesFra));
    const [afhentesTil, setAfhentesTil] = useState(new Date("2021-01-01T00:00:00.000Z"));
    const [afhentningsInformation, setAfhentningsInformation] = useReducer((value, newValue) => ({...value, ...newValue}), {
        afhentningssted: props.data.afhentningssted,
        aktiv: props.data.aktiv,
        booketStatus: props.data.booketStatus,
        kontaktPerson: props.data.kontaktPerson,
        leverandør: props.data.leverandør,
        tidsrumFra: props.data.afhentesFra,
        tidsrumTil: props.data.afhentesTil

    })
    const afslut = () => {
        props.onClose()
        props.close()
    }

    useState(() => {
        setAfhentningsInformation(props.data)
        
    },[])
    return (
        <Modal  open={props.open}
                onClose={props.onClose}>
            <div className="modalBody">
                <h2 id="simple-modal-title">{props.modalTitle}</h2>
                    <p id="simple-modal-description">
                        Indtast de sidste oplysninger, før du færdiggør afhentningen
                    </p>
                <form>
                    <input placeholder="Leverandørnavn"  defaultValue={afhentningsInformation.leverandør} onChange={(e) => setAfhentningsInformation({leverandør: e.target.value})} ></input>
                </form>
                <form>
                    <input placeholder="Kontaktperson" defaultValue={afhentningsInformation.kontaktPerson} onChange={(e) => setAfhentningsInformation({kontaktPerson: e.target.value})}></input>
                </form>
                <form>
                    <input placeholder="Afhentningssted"defaultValue={afhentningsInformation.afhentningssted} onChange={(e) => setAfhentningsInformation({afhentningssted: e.target.value})}></input>
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


export default RedigerModal;

