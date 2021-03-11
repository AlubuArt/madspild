import { useReducer} from 'react';
import { Modal } from '@material-ui/core';
import './opretafhentning.css'
import React from 'react';



const ModalBody = (props) => {

    const [vareInformationer, setVareinformationer] = useReducer((value, newValue) => ({...value, ...newValue}), {
        title: '',
        mængdeEnhed: '',
        mængde: '',
        tidsrum: '',
        
    })

    const tilføjVaren = () => {
        
        props.modalData(vareInformationer);
        setVareinformationer({title: '',
        mængdeEnhed: '',
        mængde: '',
        tidsrum: ''})
        props.onClose()
    }

    return (

        <Modal  open={props.open}
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
                    <input onChange={(e) => setVareinformationer({mængdeEnhed: e.target.value})}></input>
                </form>
                <form>
                    <label>Mængde</label>
                    <input onChange={(e) => setVareinformationer({mængde: e.target.value})}></input>
                </form>
                <form>
                    <label>Tidsrum for afhentning</label>
                    <input onChange={(e) => setVareinformationer({tidsrum: e.target.value})}></input>
                </form>
                <button onClick={tilføjVaren}>GEM</button>

        
            </div> 
        </Modal>
        

    )
}

export default ModalBody;

