import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import axios from 'axios';

export default function AddProduct () {

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
    const data = {
      name: event.target.name.value,
      image: event.target.image.value,
    };
    axios.post('http://192.168.100.124:8080/category', data, {headers: {Authorization: token}})
      .then()
      .catch(error => console.log(error));
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon><LibraryAddIcon/></ListItemIcon>
        <ListItemText primary="Add Category" />
      </ListItem>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title" style={{width: '100%'}}>
            <Avatar style={{margin: 'auto'}}>
              <LibraryAddIcon fontSize='large'/>
            </Avatar>
            <Typography component="h1" variant="h5" align='center'>
              Add New Category
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Category Name"
              name="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="image"
              label="Image URL"
              name="image"
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              type="reset"
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              type="submit"
              variant="contained"
              color="primary"
            >
              Add Category
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
