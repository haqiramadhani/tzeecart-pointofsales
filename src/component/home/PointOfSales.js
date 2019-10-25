import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import {Hidden, Paper} from "@material-ui/core";

class PointOfSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProduct: true,
      token: '',
      products: [],
      categories: [],
      cart: [],
      total: 0
    };

    this.setCart = this.setCart.bind(this);
    this.addQty = this.addQty.bind(this);
    this.reduceQty = this.reduceQty.bind(this);
    // this.clearCart = this.clearCart.bind(this);
  }

  addQty(id){
    let cartItems = this.state.cart;
    let index = cartItems.findIndex((e) => e.id === id);
    let productId = this.state.products.findIndex(e => e.id === id);
    const stock = this.state.products[productId].qty;
    cartItems[index].qty += (stock <= cartItems[index].qty) ? 0 : 1;
    this.setState({total: (stock <= cartItems[index].qty) ? this.state.total : this.state.total + cartItems[index].price});
    this.setState({cart: cartItems});
  };

  reduceQty(id){
    let cartItems = this.state.cart;
    let index = cartItems.findIndex((e) => e.id === id);
    cartItems[index].qty += (cartItems[index].qty > 0) ? -1 : 0;
    this.setState({total: (cartItems[index].qty > 0) ? this.state.total - cartItems[index].price : this.state.total});
    this.setState({cart: cartItems});
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (this.state.isProduct) {
      axios.get('http://localhost:8080/product', {headers: {'Authorization': token}})
        .then(response => this.setState({products: response.data.result.results}))
        .catch(error => console.log(error));
    } else {}
  }

  setCart(items){
    // console.log(items);
    let productId = this.state.products.findIndex(e => e.id === items.id);
    const stock = this.state.products[productId].qty;
    if (stock > 0) {
      let cartItems = this.state.cart;
      let index = cartItems.findIndex((e) => e.id === items.id);
      if (index === -1) {
        cartItems.push(items);
        this.setState({total: this.state.total + items.price});
      } else {
        if (stock <= cartItems[index].qty) alert('only ' + stock + ' product left');
        else {
          cartItems[index].qty += 1;
          this.setState({total: this.state.total + items.price});
        }
      }
      this.setState({cart: cartItems});
    } else {alert('Product out of stock!')}
  };

  // clearCart(){
  //   this.setState({cart: []});
  //   console.log('cart', this.state.cart)
  // }

  render() {
    console.log(this.state.cart);
    return (
      <div>
        <Grid container>
          <Grid item md={8}>
            <Paper style={{height: "86vh", overflowX: 'hidden'}}>
              {
                (this.state.isProduct) ? (
                  <div>
                    <Grid container spacing={1}>
                    {/*{console.log(this.state.products)}*/}
                    {
                      this.state.products.map(item => (
                          <Grid item key={item.id} xs={12} sm={6} lg={4}>
                            <SingleProduct cart={this.setCart} id={item.id} name={item.name} category={item.category_id} image={item.image} price={item.price} desc={item.description}/>
                          </Grid>
                      ))
                    }
                    </Grid>
                  </div>
                ) : (
                  <div>
                  </div>
                )
              }
            </Paper>
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <div style={{paddingLeft: '2%'}}>
                {/*<Cart items={this.state.cart} clear={this.clearCart} add={this.addQty} reduce={this.reduceQty}/>*/}
                <Cart items={this.state.cart} add={this.addQty} reduce={this.reduceQty} total={this.state.total}/>
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

export default PointOfSales;
