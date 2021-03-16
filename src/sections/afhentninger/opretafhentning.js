import {useEffect, useState} from 'react';
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
import ls, {get,set} from "local-storage";
import {addAfhentningToDataBase, deleteVarerFromAfhentning, getvarerFromDB} from '../../service/firebase.service'




const OpretAfhentning = () => {

    const [modal, setModal] = useState(false)
    const [varer, setVarer] = useState([])
    const [currentAfhentning, setCurrentAfhentning] = useState(localStorage.getItem('currentAfhentning'))


    const sletVare = (vareID) => {

        deleteVarerFromAfhentning(currentAfhentning, vareID);
        getVarer();
        
    }

    const redigerVare = (i) => {
        setModal(true)
    }

    const tilføjTilAfhentninger = () => {
         
    }

    const handleModalClose = () => {
        
        getVarer();
        setModal(false);
    }

    const getVarer = async () => {
       const varerList = await getvarerFromDB(currentAfhentning);
       setVarer(varerList)

    }

    return (
        <div>


            <ModalBody
                open={modal}
                onClose={handleModalClose}
                currentAfhentning={currentAfhentning}
                
            />

            <Card className="opret-afhentning-card">
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                           Aktuel afhentning
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
                                            slet={() => 
                                                sletVare(vare.id)}
                                            rediger={() => redigerVare(i)}
                                            
                                        />
                            })
                        }

                    
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                    
                        <Button onClick={(e) => setModal(true)}size="small" color="primary">
                            Tilføj en vare 
                        </Button>
                         <Button onClick={tilføjTilAfhentninger} size="small" color="primary">
                            Opret afhentningen
                        </Button>   
                       
                    </CardActions>  
                
                
            </Card>
        </div>
    )
}

export default OpretAfhentning;
