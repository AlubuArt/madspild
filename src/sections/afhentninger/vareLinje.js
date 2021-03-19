import Card from '@material-ui/core/Card';
import { Grid} from '@material-ui/core';
import './opretafhentning.css'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

import { withStyles } from '@material-ui/core/styles';

const StyledCard = withStyles({
    root: {
        margin: '0px',
    }
})(Card);

const VareLinje = (props) => {

    

    return (

        <StyledCard classes={{label: "my-class-label"}} spacing={2}xs="12" component="div">
            <Grid container >
                <Grid item xs={7} component="div">
                    <p>{props.title}</p>
                </Grid>
                <Grid item xs={3} component="div">
                    <p>{props.mængde}{props.mængdeEnhed}</p>
                </Grid>
                <Grid item xs={2} component="div" container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <DeleteOutlinedIcon onClick={props.slet}/>
                </Grid>
            </Grid>
        </StyledCard> 
    )
}


export default VareLinje;

