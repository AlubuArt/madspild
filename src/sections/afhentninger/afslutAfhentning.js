import { useReducer, useEffect} from 'react';
import { CardActionArea, Modal, TextField } from '@material-ui/core';
import './opretafhentning.css'
import React from 'react';
import { useState } from "react";
import { DateTimePicker} from "@material-ui/pickers";
import {setAfhentningToActive} from '../../service/firebase.service';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { format, compareAsc } from 'date-fns'
import toDate from 'date-fns/toDate'

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

const AfslutModal = (props) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [dialogOpen, setDialogOpen] = useState(false)
    const [afhentesFra, setAfhentesFra] = useState(new Date());
    const [afhentesTil, setAfhentesTil] = useState(new Date());
    const [afhentningsInformation, setAfhentningsInformation] = useReducer((value, newValue) => ({...value, ...newValue}), {
        afhentningssted: '',
        aktiv: "oprettet",
        booketStatus: 'ikke booket',
        kontaktPerson: '',
        leverandør: '',
        tidsrumFra: afhentesFra,
        tidsrumTil: afhentesTil

    })

    const afslut = () => {
        /* setAfhentningsInformation(afhentningsInformation) */
        setAfhentningToActive(props.currentAfhentning, afhentningsInformation)
        
        setDialogOpen(true)
    }

    const handleSave = () => {
        props.close()
        setDialogOpen(false)
    }

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
                        title={props.modalTitle}
                        subheader={'Indtast de sidste oplysninger, før du færdiggør afhentningen'}
                    />
                <CardActionArea>
                    <CardContent className={classes.content}>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="Leverandørnavn" 
                            onChange={(e) => setAfhentningsInformation({leverandør: e.target.value})}>
                        </TextField>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="Afhentningssted" 
                            onChange={(e) => setAfhentningsInformation({afhentningssted: e.target.value})}>
                        </TextField>
                        <TextField 
                            className={classes.textField}
                            id="standard-basic" 
                            label="Kontaktperson" 
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
                onClose={(e) => setDialogOpen(false)}
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
                <Button onClick={handleSave} color="primary">
                    OK
                    </Button>
            </DialogActions>
            </Dialog>
        </div>    
        </Modal>
        
    )
}


export default AfslutModal;
