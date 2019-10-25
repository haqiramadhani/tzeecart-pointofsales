import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

export default function AddProduct (props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    axios.delete('http://localhost:8080/product/'+props.id, {headers: {Authorization: token}})
      .then(response => {
        const status = response.data.status;
        if (status === 200) {
          this.setState({message: 'Delete product success'});
        } else {
          this.setState({message: 'Delete product unsuccessfully'})
        }
      })
      .catch(error => console.log(error));
  };


  return (
    <div>
      <DeleteIcon button="true" onClick={handleClickOpen}/>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title" style={{width: '100%'}}>
            <Avatar style={{margin: 'auto'}}>
              <DeleteIcon fontSize='large'/>
            </Avatar>
            <Typography component="h1" variant="h5" align='center'>
              Are you sure want to delete this product?
            </Typography>
          </DialogTitle>

          <DialogActions>
            <Button
              onClick={handleClose}
              type="reset"
              variant="contained"
              color="secondary"
              fullwidth
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              type="submit"
              variant="contained"
              color="primary"
              fullwidth
            >
              Delete Product
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
