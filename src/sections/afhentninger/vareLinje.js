import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './opretafhentning.css'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

const VareLinje = (props) => {



    return (

        <Card spacing={2}xs="12">
                             <Grid container >
                                <Grid item xs={4} component="div">
                                       <p>{props.title}</p>
                                </Grid>
                                <Grid item xs={2} component="div">
                                        <p>{props.mængde}{props.mængdeEnhed}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>{props.tidsrum}</p>
                                </Grid>
                                <Grid item xs={1} component="div" >
                                  <DeleteOutlinedIcon onClick={props.slet}/>
                                </Grid>
                                <Grid item xs={1} component="div" >
                                   <EditIcon onClick={props.rediger}/>
                                </Grid>

                             </Grid>

        </Card> 
    )
}

export default VareLinje;

 