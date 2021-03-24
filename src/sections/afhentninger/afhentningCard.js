import { Card, CardContent, CardActionArea, Typography, Button, CardActions } from "@material-ui/core";
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
                    <Typography gutterBottom variant="body1">
                        Afhentes fra: {parseDates(props.data.tidsrumFra.seconds)}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Afhentes til: {parseDates(props.data.tidsrumTil.seconds)}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Status: {props.data.aktiv}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Booket af: {props.data.booketStatus} 
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Betingelser: {props.data.betingelser}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Kontaktperson: {props.data.kontaktPerson}
                    </Typography>
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