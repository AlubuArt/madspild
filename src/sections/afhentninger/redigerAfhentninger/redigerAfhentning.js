import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea} from '@material-ui/core';
import '../opretAfhentning/opretafhentning.css';
import RedigerModal from '../components/redigerModal';
import ModalBody from '../components/modalBody';
import { deleteVarerFromAfhentning, getvarerFromDB, getAfhentningFromDatabase} from '../../../service/firebase.service'
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import CardHeader from '@material-ui/core/CardHeader';
import cx from 'clsx';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';



const useStyles = makeStyles(({ spacing }) => ({
    card: {
      marginTop: 40,
      borderRadius: spacing(0.5),
      transition: '0.3s',
      width: '95%',
     // overflow: 'initial',
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


const RedigerAfhentning = ({value, onChange}) => {

    const [modal, setModal] = useState(false)
    const [afslutModal, setAfslutModal] = useState(false)
    const [varer, setVarer] = useState([])
    const [currentAfhentning] = useState(localStorage.getItem('currentAfhentning'));
    const [afhentningData, setAfhentningData] = useState('1')
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    const classes = useStyles();
    


    const sletVare = (vareID) => {
        deleteVarerFromAfhentning(currentAfhentning, vareID);
        getVarer();
    }

    const handleModalClose = () => {
        getVarer();
        setModal(false);
    }


    const handleAfslutModalClose = () => {
        setAfslutModal(false)
        onChange(1)
        setVarer([])
    }

    const getVarer = async () => {
       const varerList = await getvarerFromDB(currentAfhentning);
       const afhent = await getAfhentningFromDatabase(currentAfhentning);
       setAfhentningData(afhent)
       setVarer(varerList)
    }



    function returnModal() {
        if(afhentningData !== '1') {
            return <RedigerModal 
                open={afslutModal}
                onClose={handleAfslutModalClose}                
                currentAfhentning={currentAfhentning}                
                data={afhentningData}
                modalTitle={'Redigér afhentning'}
                
            />
        }
    }

    useState(() => {
        getVarer();
    },[])

    return (
        <div>
            <ModalBody
                open={modal}
                onClose={handleModalClose}
                currentAfhentning={currentAfhentning}
            />
            {returnModal()}

            <Card className={cx(classes.card, cardShadowStyles.root)}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={'Redigér afhentning'}
                subheader={'Tilføj flere varer til afhentningen, eller slet varer i afhentningen'}
            />
                <CardActionArea>
                    <CardContent className={classes.content}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell>Varetype</TableCell>
                                <TableCell align="right">Mængde</TableCell>
                                <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {varer.map(vare => (
                                <TableRow key={vare.id}>
                                    <TableCell component="th" scope="row">
                                    {vare.title}
                                    </TableCell>
                                    <TableCell align="right">{vare.mængde} {vare.mængdeEnhed}</TableCell>
                                    <TableCell align="right">
                                        <DeleteOutlinedIcon onClick={(e) => sletVare}/> 
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" onClick={(e) => setModal(true)}size="small" >
                            Tilføj vare 
                        </Button>
                         <Button variant="contained" onClick={(e) => setAfslutModal(true)} size="small" >
                            Gem
                        </Button>  
                    </CardActions>  
            </Card>
        </div>
    )
}

export default RedigerAfhentning;
