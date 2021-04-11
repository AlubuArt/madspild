import {useState, useReducer} from 'react'
import {signupUserInDatabase} from '../../service/login.service'
import {firebase_app } from '../../service/firebase.config'
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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

  }));



const SignupPage = ({ history }) => {

    const [pass, setPass] = useState();
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [profileData, setProfileData] = useReducer((value, newValue) => ({...value, ...newValue}), {
        virksomhedsNavn: '',
        virksomhedsCVR: '',
        kontaktEmail: '',

    })

    const handleSignupClick =(e) => {
        e.preventDefault();
        signup();
    }

    const signup = async () => {
        
        try {
          await signupUserInDatabase(profileData, pass); 
          console.log("sign up sucessfull")
          redirectToHomePageAfterSuccess()
        } catch (error) {
            console.log(error)
        }
    }

    const redirectToHomePageAfterSuccess = async () => {
        try{
            await firebase_app.auth().signInWithEmailAndPassword(profileData.kontaktEmail, pass);
            history.push(`${process.env.PUBLIC_URL}/velkommen`)

        } catch (error) {
            console.log(error)
        }
        
    }


    return (
        <Container fluid='true'>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={'Opret ny profil'}
                subheader={'For at kunne registrere overskudsmad, så det kan blive afhentet, skal du registrere din virksomhed'}
                />
            <Card className={cx(classes.card, cardShadowStyles.root)}>
                <CardActionArea>
                    <CardContent className={classes.content}>
                        <TextField  
                            className="form-control" 
                            type="text" 
                            label="Virksomhedens navn"
                            onChange={(e) => setProfileData({virksomhedsNavn: e.target.value})}/>
                        <TextField 
                            className="form-control" 
                            type="text" 
                            label="Virksomhedens cvrnr."
                            onChange={(e) => setProfileData({virksomhedsCVR: e.target.value})}/>
                        <TextField 
                            className="form-control" 
                            type="text" 
                            label="Kontaktperson email"
                            onChange={(e) => setProfileData({kontaktEmail: e.target.value})}/>
                        <TextField 
                            className="form-control" 
                            type="password" 
                            placeholder="*****" 
                            label="Adgangskode"
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </CardContent>
                    <Button style={{margin: '10px'}} variant="contained" onClick={handleSignupClick}>Opret bruger</Button>
                </CardActionArea>
            </Card>
        </Container>

    )
}

export default SignupPage;
