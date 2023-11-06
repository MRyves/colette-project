import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import User from '../models/User';


interface DialogDeleteProps {
    blogs: any[];
    handleDelete: (id: any) => void;
    user?: User;
}
  

const DialogDelete: React.FC<DialogDeleteProps> = ({ blogs, user, handleDelete }) => {

    const userId = user?.uid

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

  
    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            <DeleteOutlinedIcon />
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this recipe?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {/* <Button onClick={handleClose} size="small">{ userId ? <DeleteOutlinedIcon onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }}></DeleteOutlinedIcon> : '' }</Button> */}
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default DialogDelete;
