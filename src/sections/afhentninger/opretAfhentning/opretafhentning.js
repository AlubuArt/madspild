import { useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import './opretafhentning.css'
import React from 'react';
import ModalBody from '../components/modalBody'
import CardHeader from '@material-ui/core/CardHeader';
import AfslutModal from '../components/afslutModal';
import { makeStyles } from '@material-ui/core/styles';
import { deleteVarerFromAfhentning, getvarerFromDB} from '../../../service/firebase.service'
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';



const useStyles = makeStyles(({ spacing}) => ({
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


const OpretAfhentning = ({onChange, feedback, setFeedback}) => {

    const classes = useStyles();
    const [modal, setModal] = useState(false)
    const [afslutModal, setAfslutModal] = useState(false)
    const [varer, setVarer] = useState([])
    const [currentAfhentning, setCurrentAfhentning] = useState(localStorage.getItem('currentAfhentning'));
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const cardHeaderShadowStyles = useFadedShadowStyles();
    


    const sletVare =  (vareID) => {
      
        deleteVarerFromAfhentning(currentAfhentning, vareID);
        getVarer();
    }

    const handleModalClose = () => {
        
        setModal(false);
        getVarer();
    }

    const handleAfslutModalClose = () => {
        setAfslutModal(false)
    }

    const getVarer = async () => {
       const varerList = await getvarerFromDB(currentAfhentning);
       setVarer(varerList)
    }

    const clearVarerList = () => {
        setCurrentAfhentning('')
        setVarer([])
        setAfslutModal(false)
        setFeedback(true)
        onChange(0)

    }

    /* const redigerVare = async (vareID) => {
        const s = getSelectedVareFromDatabase(currentAfhentning, vareID)
        setSelectedVare(s)
        setModal(true)
    } */


    useEffect(() => {
        getVarer();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [modal])

    return (
        <div>
            <ModalBody
                open={modal}
                onClose={handleModalClose}
                currentAfhentning={currentAfhentning}
              //  selectedVare={selectedVare}
               
            />

            <AfslutModal 
                open={afslutModal}
                onClose={handleAfslutModalClose}
                currentAfhentning={currentAfhentning}
                close={clearVarerList}
                data={'2'}
                modalTitle="Færdiggør afhentning"

            />

            <Card className={cx(classes.card, cardShadowStyles.root)}>
            <CardHeader
                className={cardHeaderShadowStyles.root}
                classes={cardHeaderStyles}
                title={'Opret ny afhentning'}
                subheader={'Tilføj varer til afhentningen'}
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
                <TableCell align="center">{vare.mængde} {vare.mængdeEnhed}</TableCell>
                {/* <TableCell align="right" size="small" >
                  <EditIcon onClick={(e) => redigerVare(vare.id)} />
                </TableCell> */}
                <TableCell align="center" size="small" padding="none">
                    <DeleteOutlinedIcon onClick={(e) => sletVare(vare.id)}/> 
                </TableCell>
                
               
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
                    </CardContent>
                    </CardActionArea>
                    <CardActions >
                        <Button variant="contained" onClick={(e) => setModal(true)}size="small" >
                            Tilføj vare 
                        </Button>
                         <Button variant="contained" onClick={(e) => setAfslutModal(true)} size="small" >
                            Opret
                        </Button>   
                    </CardActions>  
            </Card>
           
        </div>
    )
}

export default OpretAfhentning;
