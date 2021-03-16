import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import './opretafhentning.css'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

const VareLinje = (props) => {

    return (

        <Card spacing={2}xs="12">
            <Grid container >
                <Grid item xs={5} component="div">
                    <p>{props.title}</p>
                </Grid>
                <Grid item xs={5} component="div">
                    <p>{props.mængde}{props.mængdeEnhed}</p>
                </Grid>
                <Grid item xs={2} component="div" >
                    <DeleteOutlinedIcon onClick={props.slet}/>
                </Grid>
            </Grid>
        </Card> 
    )
}

export default VareLinje;

 