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




const OpretAfhentning = () => {

    
    const [afhentning, setAfhentning] = useState()
    const [modal, setModal] = useState(false)
    const [varer, setVarer] = useState([{
                                title: "Salat",
                                mængde: "50",
                                mængdeEnhed: "kg",
                                tidsrum: "08.00-16.00"
                            },
                            {
                                title: "Salat",
                                mængde: "50",
                                mængdeEnhed: "kg",
                                tidsrum: "08.00-16.00"
                            },{
                                title: "Salat",
                                mængde: "50",
                                mængdeEnhed: "kg",
                                tidsrum: "08.00-16.00"
                        }])

    const sletVare = () => {
        
    }

    const redigerVare = () => {
        
    }

    const tilføjTilAfhentninger = () => {


    }

    const handleModalClose = () => {

        setModal(false);
    }

    useEffect(() => {

    })
    

    const body = (
        <div >
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          
        </div>
      );


    //TODO modal
    return (
        <div>
            <Modal
                open={modal}
                onClose={handleModalClose}
            >
                {body}

            </Modal>

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
                                            tidsrum={vare.tidsrum}
                                            key={i}
                                            slet={sletVare}
                                            rediger={redigerVare}
                                            
                                        />
                            })
                        }

                    
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                    
                        <Button onClick={(e) => setModal(true)}size="small" color="primary">
                            Tilføj en vare mere
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
