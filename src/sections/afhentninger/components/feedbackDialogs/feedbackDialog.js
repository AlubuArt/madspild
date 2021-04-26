import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {sendFeedbackToDatabase} from '../../../../service/feedback.service';


export default function FeedbackFormDialog(props) {
  
  const [feedback, setFeedback] = useState('');
  const [user] = useState(props.user);
  const [uim] = useState(props.uim);

  const handleClose = () => {
    
    sendFeedbackToDatabase(user, feedback)
    
    props.onClose()
  };

  const handleCloseAndLogout = async () => {
    console.log("feedback")
    await sendFeedbackToDatabase(user, feedback, uim)
    props.logout()
  }

  return (
    <div>
      
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          
          <DialogContentText>
          {props.question} 
          </DialogContentText>
          { props.subq1 ?
          <DialogContentText>
          {props.subq1} 
          <br></br>
          <DialogContentText>
          {props.subq2}
          </DialogContentText>
          <DialogContentText>
          {props.subq3}
          </DialogContentText>
          </DialogContentText>
          :  
          <DialogContentText>
          
          </DialogContentText>
          }
          <TextField
            multiline
            autoFocus
            margin="dense"
            id="name"
            label="Dit svar"
            type="email"
            fullWidth
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          { props.logout ? 
          <Button onClick={handleCloseAndLogout} color="primary">
          Send feedback
        </Button>
        : <Button onClick={handleClose} color="primary">
          Send feedback
          </Button>
      }
        
        </DialogActions>
      </Dialog>
    </div>
  );
}