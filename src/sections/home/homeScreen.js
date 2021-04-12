import {useState} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './home.css'
import {Container} from '@material-ui/core';
import {addAfhentningToDataBase} from '../../service/firebase.service'
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';


const HomeScreen = ({ onChange}) => {

    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [currentUser] = useState(localStorage.getItem('userID'))

    const opretAfhentning = async () => {
        const currentAfhentning = await addAfhentningToDataBase(currentUser);
        localStorage.setItem('currentAfhentning', currentAfhentning); 
        onChange(3);
    }
    
   
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