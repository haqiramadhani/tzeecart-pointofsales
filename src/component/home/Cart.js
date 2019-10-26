import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SingleCart from './SingleCart';
import axios from 'axios';
import NumberFormat from "react-number-format";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    };
  };

  handleCheckout (){
    const token = localStorage.getItem('token');
    const sales = this.state.items;
    sales.forEach(item => {
      const data = {
        product_id: item.id,
        qty: item.qty
      };
      axios.post('http://192.168.100.124:8080/transaction/reduce', data, {headers: {Authorization: token}})
        .then(response => console.log(response))
        .catch(error => console.log(error));
    });
    // this.props.clear();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Paper style={{height: "75vh", overflow: 'auto', overflowY: 'none'}}>
          {/* List Order */}
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            {this.state.items.map(item => (
              <SingleCart key={item.id} add={this.props.add} reduce={this.props.reduce} id={item.id} name={item.name} image={item.image} price={item.price} qty={item.qty}/>
            ))}
          </Grid>
        </Paper>
        <Paper style={{height: "10vh"}}>
          <Grid container >
            <Button variant="contained" fullWidth color="primary" onClick={() => {this.handleCheckout()}}>
              CHECKOUT - Rp. <NumberFormat displayType={'text'} value={this.props.total} thousandSeparator='.' decimalSeparator=','/>
            </Button>
            <Button variant="contained" fullWidth color="secondary">
            {/*<Button variant="contained" fullWidth color="secondary" onClick={() => {this.props.clear()}}>*/}
              CANCEL
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Cart;
