import {useState} from 'react'
import {getAfhentningerFromDatabase, sletAfhentningFraDatabse} from '../../service/firebase.service'
import AfhentningCard from './afhentningCard'

const Afhentninger = ({value, onChange}) => {

    const [afhentninger, setAfhentninger] = useState([])
    const [currentAfhentning, setCurrentAfhentning] = useState()
    

    const getAfhentninger = async () => {
        const afhentninger = await getAfhentningerFromDatabase()
        setAfhentninger(afhentninger)
    }

    const rediger = () => {
        onChange(4)
    }

    useState(() => {
        getAfhentninger()

    }, [])

    return (
        <div>
            <h1>Afhentninger</h1>
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
