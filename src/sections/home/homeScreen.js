import {useState, useEffect} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './home.css'
import {Container} from '@material-ui/core';
import {addAfhentningToDataBase} from '../../service/firebase.service'
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import FeedbackFormDialog from '../afhentninger/components/feedbackDialogs/feedbackDialog';
import {infrastrukturFeedback1, infrastrukturFeedback2, infrastrukturFeedbackTitle, infrastrukturFeedbackNextTitle, subq1, subq2, subq3} from '../../util/index'



const HomeScreen = ({ onChange, feedback, setFeedback }) => {

    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [nextFeedback, setNextFeedback] = useState(false)
    const [currentUser] = useState(localStorage.getItem('userID'));
    const [newUser, setNewUser] = useState(localStorage.getItem("newUser"))
    const [newUserFeedbackDialog, setNewuserFeedbackDialog] = useState(false)




    const opretAfhentning = async () => {
        const currentAfhentning = await addAfhentningToDataBase(currentUser);
        localStorage.setItem('currentAfhentning', currentAfhentning); 
        onChange(3);
    }

    const handleFeedback = () => {
    }


    const handleClose = () => {
        setFeedback(false)
        setNextFeedback(true)
    }

    const handleCloseNext = () => {
        setNextFeedback(false)

    }

    useEffect(() => {
        if(newUser === "true") {
            setNewuserFeedbackDialog(true)
        }
    },[newUser])

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
                <FeedbackFormDialog 
                    open={feedback}
                    onClose={handleClose}
                    handleFeedback={handleFeedback}
                    user={currentUser}
                    question={infrastrukturFeedback1}
                    title={infrastrukturFeedbackTitle}/>
                <FeedbackFormDialog 
                    open={nextFeedback}
                    onClose={handleCloseNext}
                    handleFeedback={handleFeedback}
                    user={currentUser}
                    question={infrastrukturFeedback2}
                    title={infrastrukturFeedbackNextTitle}
                    subq1={subq1}
                    subq2={subq2}
                    subq3={subq3}/>
                    
            </Container>
         </>
    )
}



export default HomeScreen;