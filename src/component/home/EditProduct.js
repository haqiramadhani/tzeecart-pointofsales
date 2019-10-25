import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Category from './Category';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";

export default function AddProduct (props) {

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    name: props.name,
    desc: props.desc,
    price: props.price,
    image: props.image,
  });

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
    axios.put('http://localhost:8080/product/'+props.id, data, {headers: {Authorization: token}})
      .then(response => {
        const status = response.data.status;
        if (status === 200) {
          this.setState({message: 'Edit product success'});
        } else {
          this.setState({message: 'Edit product unsuccessfully'})
        }
      })
      .catch(error => console.log(error));
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <EditIcon button="true" onClick={handleClickOpen}/>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title" style={{width: '100%'}}>
            <Avatar style={{margin: 'auto'}}>
              <EditIcon fontSize='large'/>
            </Avatar>
            <Typography component="h1" variant="h5" align='center'>
              Edit Product
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
              value={values.name}
              onChange={handleChange('name')}
            />
            <Category name={props.category}/>
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
              value={values.desc}
              onChange={handleChange('desc')}
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
              value={values.price}
              onChange={handleChange('price')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="image"
              label="Image URL"
              name="image"
              value={values.image}
              onChange={handleChange('image')}
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
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
