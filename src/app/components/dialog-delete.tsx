import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


interface DialogDeleteProps {
  isOpen: boolean;
  handleDelete: () => void;
  handleClose: () => void;
}


const DialogDelete: React.FC<DialogDeleteProps> = ({  isOpen, handleDelete, handleClose }) => {

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Bist du sicher, dass du dieses Rezept löschen möchtest?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={() => handleDelete()} size='small'>
            <DeleteOutlinedIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogDelete;
