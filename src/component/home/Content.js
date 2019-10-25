import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import PointOfSales from './PointOfSales';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/dashboard' component={Dashboard}/>
          <Route exact path='/' component={PointOfSales}/>
        </Switch>
      </div>
    );
  }
}

export default Content;
