import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token')
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/login'>
            {(this.state.token != null && this.state.token !== "undefined")?<Redirect to='/'/>:<Login/>}
          </Route>
          <Route path='/register'>
            {(this.state.token != null && this.state.token !== "undefined")?<Redirect to='/'/>:<Register/>}
          </Route>
          <Route path='/'>
            {(this.state.token == null || this.state.token === "undefined")?<Redirect to='/login'/>:<Home/>}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
