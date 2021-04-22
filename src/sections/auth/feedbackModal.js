import { useReducer} from 'react';
import { CardActionArea, Modal } from '@material-ui/core';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {firebase_app} from '../../service/firebase.config';

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
    }
  }));


const FeedbackModal = ( props) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [vareInformationer, setVareinformationer] = useReducer((value, newValue) => ({...value, ...newValue}), {
        title: '',
        mængdeEnhed: '',
        mængde: '',
       
    })

    


    return (

        <Modal  open={props.open}
                onClose={props.onClose}
                style={{ alignItems: "center", justifyContent: "center", BackdropProps: {opacity: '0.90'}}}
               
        >
                    <Card className={cx(classes.card, cardShadowStyles.root)}>
                    <CardHeader
                        className={cardHeaderShadowStyles.root}
                        classes={cardHeaderStyles}
                        title={'Giv feedback'}
                        subheader={'Hvordan var din oplevelse af...'}
                    />
                    <CardActionArea>
                    <CardContent className={classes.content}>
                        <div>
                            <TextField className={classes.textField} id="standard-basic" label="Varens type" onChange={(e) => setVareinformationer({title: e.target.value})}/> 
                        </div>

                <div>
                   <Button style={{marginTop: '20px'}}variant="contained" onClick={props.handleSignupClick}>Videre</Button> 
                </div>
                    </CardContent>
                    </CardActionArea>
                    </Card>
        </Modal>
        

    )
}

export default FeedbackModal;

