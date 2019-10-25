import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import React, {Component} from "react";
import axios from 'axios';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['please wait...'],
      category: props.name,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({category: event.target.value});
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/category', {headers: {'Authorization': token}})
      .then(response => this.setState({categories: response.data.result}))
      .catch(error => console.log(error));
  }

  render() {
    const categories = this.state.categories;
    return (
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          select
          value={this.state.category}
          onChange={this.handleChange}
          id="category"
          label="Category"
          name="category"
        >
          {categories.map(item => (
            <MenuItem name='category_id' value={item.id} >{item.name}</MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default Category;
