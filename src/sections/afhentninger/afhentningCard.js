import { Card, CardContent, CardActionArea, Typography, Button, CardActions, Grid } from "@material-ui/core";
import { sletAfhentningFraDatabase } from "../../service/firebase.service";
import RedigerAfhentningModal from './redigerAfhentning'
import {useState, useEffect} from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import toDate from 'date-fns/toDate'
import fromUnixTime from 'date-fns/fromUnixTime'

const useStyles = makeStyles(({ spacing }) => ({
    card: {
      marginTop: 40,
      borderRadius: spacing(0.5),
      transition: '0.3s',
      width: '95%',
     // overflow: 'initial',
      background: '#ffffff',
      
    },
    content: {
      paddingTop: 20,
      textAlign: 'left',
      overflowX: 'auto',
      '& table': {
        marginBottom: 0,
      }
    },
    item: {
        textAlign: 'center'
    }
  }));

const AfhentningCard = (props) => {

    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [afhentningID, setAfhentningID] = useState(props.data.id);
    const [modal, setModal] = useState(false);
    const classes = useStyles();
     

    const sletAfhentning = () => {
        sletAfhentningFraDatabase(props.data.id)
        props.update()
    }

    const redigerAfhentning = () => {
        localStorage.setItem('currentAfhentning', afhentningID)
        props.rediger()
    }

    const parseDates = (date) => {
        const fra = fromUnixTime(date)
        var dateAsString = fra.toString()
        
        return dateAsString
    }

    

    return (
        <div>
        <Card className={cx(classes.card, cardShadowStyles.root)}>
            <CardActionArea>
                <CardContent className={classes.content}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="subtitle2">
                                Afhentes fra:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography gutterBottom paragraph variant="p">
                                {parseDates(props.data.tidsrumFra.seconds)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="subtitle2">
                                Afhentes til:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography gutterBottom paragraph variant="p">
                                {parseDates(props.data.tidsrumTil.seconds)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="subtitle2">
                                Status:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom paragraph variant="p">
                            {props.data.aktiv}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" paragraph gutterBottom={true}>
                                Booket af:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="p" gutterBottom={true}>
                            {props.data.booketStatus}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography gutterBottom variant="subtitle2">
                                Noter til afhentningen:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography gutterBottom variant="p">
                            {props.data.betingelser}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" onClick={(e) => sletAfhentning()}>Slet</Button>
                <Button variant="contained"onClick={(e) => redigerAfhentning()}>Redigér</Button> 
            </CardActions>
            
        </Card>
        
        </div>
    )


}

export default AfhentningCard;