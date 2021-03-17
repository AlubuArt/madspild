import { Card, CardContent, CardActionArea, Typography, Button } from "@material-ui/core";
import { sletAfhentningFraDatabase } from "../../service/firebase.service";
import RedigerAfhentningModal from './redigerAfhentning'
import {useState} from 'react'



const AfhentningCard = (props) => {

    const [afhentningID, setAfhentningID] = useState(props.data.id);
    const [modal, setModal] = useState(false)

    const sletAfhentning = () => {
        sletAfhentningFraDatabase(props.data.id)
        props.update()
    }

    const redigerAfhentning = () => {
        localStorage.setItem('currentAfhentning', afhentningID)
        props.rediger()
    }

    return (
        <div>
        <Card className="afhentning-card">
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="body1">
                        Afhentes fra:
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Afhentes til:
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Status: {props.data.aktiv}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Booket af: {props.data.booketStatus} 
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Betingelser: {props.data.betingelser}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Kontaktperson: {props.data.kontaktPerson}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button onClick={(e) => sletAfhentning()}>Slet</Button>
            <Button onClick={(e) => redigerAfhentning()}>Redigér</Button>
        </Card>
        
        </div>
    )


}

export default AfhentningCard;