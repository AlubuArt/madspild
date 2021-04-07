import {useState} from 'react'
import {getAfhentningerFromDatabase, getUsersAfhentninger} from '../../service/firebase.service'
import AfhentningCard from './afhentningCard'
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import CardHeader from '@material-ui/core/CardHeader';
import './afhentninger.css';

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
    },
   
  }));

const Afhentninger = ({value, onChange}) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const [afhentninger, setAfhentninger] = useState([])
    const [currentAfhentning, setCurrentAfhentning] = useState()
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('userID'));
    

    const getAfhentninger = async () => {
        //const afhentninger = await getAfhentningerFromDatabase()
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
                        title={'Jeres afhentninger'}
                        subheader={'Her får i overblik over jeres afhentninger. I kan se om en afhentning er aktiv og synlig for aftagere. Og i kan se om afhentniger er booket, og hvem de er booket af.'}
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
