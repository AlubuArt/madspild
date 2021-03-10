import {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardHeader, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './opretafhentning.css'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import VareLinje from './vareLinje';


const OpretAfhentning = () => {

    const [afhentning, setAfhentning] = useState()
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


   

    useEffect(() => {

    })


    

    return (
        <div>
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
                                        />
                            })
                        }
                        
                    </CardContent>  
                </CardActionArea>
                
            </Card>
        </div>
    )
}

export default OpretAfhentning;
