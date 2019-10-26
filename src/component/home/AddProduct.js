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
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Category from './Category';
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
      description: event.target.description.value,
      image: event.target.image.value,
      price: event.target.price.value,
      category_id: event.target.category.value
    };
    axios.post('http://192.168.100.124:8080/product', data, {headers: {Authorization: token}})
      .then(response => {
        const status = response.data.status;
        if (status === 200) {
          this.setState({message: 'Add product success'});
        } else {
          this.setState({message: 'Add product unsuccessfully'})
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon><AddPhotoAlternateIcon/></ListItemIcon>
        <ListItemText primary="Add Product" />
      </ListItem>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title" style={{width: '100%'}}>
            <Avatar style={{margin: 'auto'}}>
              <AddPhotoAlternateIcon fontSize='large'/>
            </Avatar>
            <Typography component="h1" variant="h5" align='center'>
              Add New Product
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              autoFocus
            />
            <Category/>
            <TextField
              variant="outlined"
              margin="normal"
              required
              multiline
              rows="4"
              fullWidth
              id="description"
              label="Description"
              name="description"
            />
            <TextField
              variant="outlined"
              margin="normal"
              type='number'
              required
              fullWidth
              id="price"
              label="Product Price"
              name="price"
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
              Add Product
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
