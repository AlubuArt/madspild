import React, {useState, useReducer, useEffect} from 'react';
import { CardActionArea, Modal, TextField } from '@material-ui/core';
import '../opretAfhentning/opretafhentning.css'
import { DateTimePicker} from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {setAfhentningToActive} from '../../../service/firebase.service';
import fromUnixTime from 'date-fns/fromUnixTime';

    const useStyles = makeStyles(({ spacing }) => ({
        card: {
          marginTop: 40,
          borderRadius: spacing(0.5),
          transition: '0.3s',
          width: '95%',
          //overflow: 'initial',
          background: '#ffffff',
        },
        content: {
          paddingTop: 0,
          textAlign: 'left',
          overflowX: 'auto',
          '& table': {
            marginBottom: 0,
          }
        },
        textField: {
            marginTop: '10px',
    
        }, 
        select: {
            marginTop: '30px'
        },
        picker: {
            marginTop: '20px'
        }
    }));



const RedigerModal = (props) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [dialogOpen, setDialogOpen] = useState(false)
    const [afhentesFra, setAfhentesFra] = useState(new Date(fromUnixTime(props.data.tidsrumFra.seconds)));
    const [afhentesTil, setAfhentesTil] = useState(new Date(fromUnixTime(props.data.tidsrumTil.seconds)));
    const [afhentningsInformation, setAfhentningsInformation] = useReducer((value, newValue) => ({...value, ...newValue}), {
        afhentningsadresse: props.data.afhentningsadresse,
        by: props.data.by,
        postnummer: props.data.postnummer,
        aktiv: props.data.aktiv,
        booketStatus: props.data.booketStatus,
        kontaktPerson: props.data.kontaktPerson,
        leverandør: props.data.leverandør,
        tidsrumFra: afhentesFra,
        tidsrumTil: afhentesTil,

    })
    const afslut = () => {
        setAfhentningToActive(props.currentAfhentning, afhentningsInformation)
        setDialogOpen(true)
    }

    const handleClose = () => {
        setDialogOpen(false)
        props.onClose()
        
    }

    
    

    useEffect(() => {
        setAfhentningsInformation(props.data) 
        console.log(fromUnixTime(props.data.tidsrumTil.seconds))
    },[props.data])

    useEffect(() => {
        setAfhentningsInformation({tidsrumFra: afhentesFra})
        setAfhentningsInformation({tidsrumTil: afhentesTil})
    }, [afhentesFra, afhentesTil])


    return (
        <Modal  open={props.open}
                onClose={props.onClose}
                
        >
            <div>
            <Card className={cx(classes.card, cardShadowStyles.root)}>
                <CardHeader
                        className={cardHeaderShadowStyles.root}
                        classes={cardHeaderStyles}
                        title={'Gem afhentningen'}
                        subheader={'Du kan redigere i oplysningerne inden du kommer afhentningen'}
                    />
                <CardActionArea>
                    <CardContent className={classes.content}>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="Leverandørnavn" 
                            defaultValue={afhentningsInformation.virksomhedsNavn} 
                            onChange={(e) => setAfhentningsInformation({leverandør: e.target.value})}>
                        </TextField>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="Afhentningsadresse" 
                            defaultValue={afhentningsInformation.afhentningsadresse} 
                            onChange={(e) => setAfhentningsInformation({afhentningsadresse: e.target.value})}>
                        </TextField>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="By" 
                            defaultValue={afhentningsInformation.by} 
                            onChange={(e) => setAfhentningsInformation({by: e.target.value})}>
                        </TextField>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="Postnummer" 
                            defaultValue={afhentningsInformation.postnummer} 
                            onChange={(e) => setAfhentningsInformation({postnummer: e.target.value})}>
                        </TextField>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="Kontaktperson" 
                            defaultValue={afhentningsInformation.kontaktPerson} 
                            onChange={(e) => setAfhentningsInformation({kontaktPerson: e.target.value})}>
                        </TextField>
                        <DateTimePicker
                            variant="inline"
                            label="Afhentes fra"
                            value={afhentesFra}
                            onChange={setAfhentesFra}
                            className={classes.picker}  
                        />
                        <DateTimePicker
                            variant="inline"
                            label="Afhentes indtil"
                            value={afhentesTil}
                            onChange={setAfhentesTil}
                            className={classes.picker}
                        />
                <div>
                    <Button style={{marginTop: '20px'}}variant="contained" onClick={(e) => afslut()}>GEM</Button>
               </div>
                    </CardContent>
                </CardActionArea>
            </Card>
                <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Afhentningen blev oprettet"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Afhetningen er nu synlig for potentielle aftagere. 
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    OK
                    </Button>
            </DialogActions>
            </Dialog>
        </div>    
        </Modal>
    )
}


export default RedigerModal;

