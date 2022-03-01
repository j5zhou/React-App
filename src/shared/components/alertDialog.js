import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const handleConfirm = () => {
     props.handleConfirm();
  };

  const handleClose = () => {
      props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="Alert-dialog"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
