import {useState, useEffect} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './home.css'
import {Container} from '@material-ui/core';
import {addAfhentningToDataBase} from '../../service/firebase.service'
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import {getUserData} from '../../service/firebase.service'


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

const HomeScreen = ({value, onChange}) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('userID'))
    const [userName, setUserName] = useState('')

    const opretAfhentning = async () => {
        const currentAfhentning = await addAfhentningToDataBase(currentUser);
        localStorage.setItem('currentAfhentning', currentAfhentning); 
        onChange(3);
    }

  

  useEffect(() => {


   
  }, [])    
   
    return (
        <>
            <Container fluid="true"  >
            <CardHeader
                    className={cardHeaderShadowStyles.root}
                    classes={cardHeaderStyles}
                    title={'Velkommen'}
                    subheader={'Har i noget overskudsmad der kan afhentes? Så start med at oprette en ny donation, så potentielle aftagere kan se og booke din donation til afhentning. Når din donation er oprettet kan du se den under "Donationer"'}
                    />
                <div className="home-main-container">
                    <div className="add-container">
                        <Fab onClick={opretAfhentning} aria-label="add">
                            <AddIcon />
                        </Fab>
                        <h3 className="add-container-h3">NY DONATION</h3>
                    </div>
                </div>
            </Container>
         </>
    )
}



export default HomeScreen;