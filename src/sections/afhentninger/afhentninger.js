import {useState} from 'react'
import {getUsersAfhentninger} from '../../service/firebase.service'
import AfhentningCard from './components/afhentningCard'
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import CardHeader from '@material-ui/core/CardHeader';
import './afhentninger.css';



const Afhentninger = ({onChange}) => {

    
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [afhentninger, setAfhentninger] = useState([])
    const [currentAfhentning, setCurrentAfhentning] = useState()
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('userID'));
    

    const getAfhentninger = async () => {
        
        const afhentninger = await getUsersAfhentninger(currentUser)
        setAfhentninger(afhentninger)
    }

    const rediger = () => {
        onChange(4)
    }

    useState(() => {
        getAfhentninger()

    }, [])

    return (
        <div className="scroll-touch">
            
                <CardHeader
                        className={cardHeaderShadowStyles.root}
                        classes={cardHeaderStyles}
                        title={'Jeres donationer'}
                        subheader={'Her får i overblik over jeres donationer. I kan se om en donation er aktiv og synlig for aftagere. Og i kan se om donationer er booket, og hvem de er booket af.'}
                    />
            
            
            { 
                afhentninger.map((afhentning, i) => {

                    
                        return <AfhentningCard 
                            data={afhentning}
                            key={i}
                            update={getAfhentninger}
                            rediger={rediger}
                            currentAfhentning={setCurrentAfhentning}
                        />
                    
                       
                    
                    
                })
            }
        </div>
    )
}

export default Afhentninger;
