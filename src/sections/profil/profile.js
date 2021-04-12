/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useReducer, useEffect} from 'react';
import {Container} from '@material-ui/core';
import {updateUserDataInDatabase, getUserData} from '../../service/firebase.service'
import {logoutUser} from '../../service/login.service'
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
    }

  }));


const Profile = ({ history  }) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [loggedInUser] = useState(localStorage.getItem('userID'))
    const [userData, setUserData] = useReducer((value, newValue) => ({...value, ...newValue}), {
        virksomhedsCVR: '',
        afhentningsadresse: '',
        by: '',
        postnummer: '',
        tidsrum: '',
        kontaktPerson: '',
        note: '',
        kontaktEmail: '',
        virksomhedsNavn: '',
    })

    const handleSave = () => {
        updateUserData()
    }

    const handleLogud = () => {
        logoutUser()
        history.push(`${process.env.PUBLIC_URL}/login`)
       
    }

    const updateUserData = async () => {
        try{
            
            await updateUserDataInDatabase(userData, loggedInUser);
            alert("Oplysninger blev opdateret")
            getData();
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try{
            const data = await getUserData(loggedInUser);
            for (let [key, val] of Object.entries(data)) {
                setUserData({[key]: val})
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
       getData()
    }, [])

    return (
        <Container fluid="true" >
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={'Virksomhedsprofil'}
                subheader={'Udfyld oplysninger om virksomheden, så er de autoudfyldt når du oprette en ny donation, men kan stadig rettes i under oprettelse. '}
            />
            <Card className={cx(classes.card, cardShadowStyles.root)}>
                <CardActionArea>
                    <CardContent>
                        <TextField
                            
                            className="form-control"
                            type="number"
                            label="Cvrnr"
                            value={userData.virksomhedsCVR}
                            onChange={(e) => setUserData({virksomhedsCVR: e.target.value})}
                        />
                        <TextField
                            className="form-control"
                            type="text"
                            label="Virksomhed"
                            value={userData.virksomhedsNavn}
                            onChange={(e) => setUserData({virksomhedsNavn: e.target.value})}
                        />
                        <TextField
                            className="form-control"
                            type="email"
                            label="Email"
                            value={userData.kontaktEmail}
                            onChange={(e) => setUserData({kontaktEmail: e.target.value})}
                        />
                        <TextField
                            className="form-control"
                            type="text"
                            label="Kontaktperson"
                            value={userData.kontaktPerson}
                            onChange={(e) => setUserData({kontaktPerson: e.target.value})}
                        />
                        <TextField
                            className="form-control"
                            type="text"
                            label="Afhentningsadresse"
                            value={userData.afhentningsadresse}
                            onChange={(e) => setUserData({afhentningsadresse: e.target.value})}
                        />
                        <TextField
                            className="form-control"
                            type="text"
                            label="By"
                            value={userData.by}
                            onChange={(e) => setUserData({by: e.target.value})}
                        />
                        <TextField
                            className="form-control"
                            type="number"
                            label="Postnummer"
                            value={userData.postnummer}
                            onChange={(e) => setUserData({postnummer: e.target.value})}
                        />
                        {/* <TextField
                            className="form-control"
                            type="text"
                            label="tidsrum"
                            value={userData.tidsrum}
                            onChange={(e) => setUserData({tidsrum: e.target.value})}
                        /> */}
                        <TextField
                            className="form-control"
                            type="text"
                            label="Note til afhenter"
                            value={userData.note}
                            onChange={(e) => setUserData({note: e.target.value})}
                        />
                        <div>
                            <Button style={{marginTop: '20px', marginRight: "20px"}} variant="contained" onClick={handleSave}>Gem</Button>
                            <Button style={{marginTop: '20px' }} variant="contained" onClick={handleLogud}>Log ud</Button>
                            
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    )

}

export default withRouter(Profile);