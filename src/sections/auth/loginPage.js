import {useState} from 'react'
import {loginUser} from '../../service/login.service'
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
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

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


  const LoginPage = ({ history }) => {

    
    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = async () => {
        console.log('logged in');
        try {
            await loginUser(email, pass);
            history.push(`${process.env.PUBLIC_URL}/velkommen`)
        } catch (error) {
            console.log (error);
        }
    }

    const handleOpretProfil = () => {
        history.push(`${process.env.PUBLIC_URL}/opret-bruger`)
    }

      return (
        <Container fluid="true">
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={'Login'}
                subheader={'Login for at oprette en ny donation af overskudsmad.'}
            />
                <Card className={cx(classes.card, cardShadowStyles.root)}>
                    <CardActionArea>
                        <CardContent>
                            <TextField
                                className="form-control"
                                type="email"
                                label="Email"
                                onChange={(e) =>setEmail(e.target.value)}
                            />
                            <TextField
                                className="form-control"
                                type="password"
                                label="Password"
                                onChange={(e) =>setPass(e.target.value)}
                            />
                            <div>
                            <Button style={{marginTop: '20px'}} variant="contained" onClick={handleLogin}>Login</Button>
                            </div>
                            <Typography style={{marginTop: '20px'}}>Har du ikke en profil? Opret en før du kan lave en donation</Typography>
                            <div>
                            <Button  variant="contained" onClick={handleOpretProfil}>Opret profil</Button>
                            </div>
                        </CardContent>
                    </CardActionArea>  
                </Card>


        </Container>
      )
  }


export default withRouter(LoginPage) 
