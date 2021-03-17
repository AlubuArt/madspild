import {useEffect, useState, useReducer} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Grid, Modal } from '@material-ui/core';
import './opretafhentning.css'
import VareLinje from './vareLinje';
import React from 'react';
import ModalBody from './modalBody'
import RedigerModal from './redigerModal';
import ls, {get,set} from "local-storage";
import { deleteVarerFromAfhentning, getvarerFromDB, getAfhentningFromDatabase} from '../../service/firebase.service'




const RedigerAfhentning = () => {

    const [modal, setModal] = useState(false)
    const [afslutModal, setAfslutModal] = useState(false)
    const [varer, setVarer] = useState([])
    const [currentAfhentning, setCurrentAfhentning] = useState(localStorage.getItem('currentAfhentning'));
    const [afhentningData, setAfhentningData] = useState('1')
    


    const sletVare = (vareID) => {
        deleteVarerFromAfhentning(currentAfhentning, vareID);
        getVarer();
    }

    const handleModalClose = () => {
        getVarer();
        setModal(false);
    }

    const handleAfslutModalClose = () => {
        setAfslutModal(false)
    }

    const getVarer = async () => {
       const varerList = await getvarerFromDB(currentAfhentning);
       const afhent = await getAfhentningFromDatabase(currentAfhentning);
       setAfhentningData(afhent)
       setVarer(varerList)
    }

    const clearVarerList = () => {
        setVarer([])
    }

    function returnModal() {
        if(afhentningData !== '1') {
            return <RedigerModal 
                open={afslutModal}
                onClose={handleAfslutModalClose}
                currentAfhentning={currentAfhentning}
                close={clearVarerList}
                data={afhentningData}
                modalTitle={'Redigér afhentning'}
                
            />
        }
    }

    useState(() => {
        getVarer();
    })

    return (
        <div>
            <ModalBody
                open={modal}
                onClose={handleModalClose}
                currentAfhentning={currentAfhentning}
            />
            
            {returnModal()}

            <Card className="opret-afhentning-card">
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                           Redigér afhentning
                        </Typography> 
                            <Grid container>
                                <Grid item xs={4} component="div">
                                    <p>Type</p>
                                </Grid>
                                <Grid item xs={2} component="div">
                                    <p>Mængde</p>
                                </Grid>
                                <Grid item xs={4} component="div">
                                    <p>Tidsrum</p>
                                </Grid>
                            </Grid>
                        {
                            varer.map((vare, i) => {
                                return <VareLinje 
                                        title={vare.title}
                                        mængde={vare.mængde}
                                        mængdeEnhed={vare.mængdeEnhed}
                                        key={i}
                                        slet={() => sletVare(vare.id)}
                                        />
                            })
                        }

                    
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={(e) => setModal(true)}size="small" color="primary">
                            Tilføj en vare 
                        </Button>
                         <Button onClick={(e) => setAfslutModal(true)} size="small" color="primary">
                            Gem
                        </Button>   
                       
                    </CardActions>  
                
                
            </Card>
        </div>
    )
}

export default RedigerAfhentning;
