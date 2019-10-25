import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AssignmentIcon from '@material-ui/icons/Assignment';
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";


class SideListItem extends Component {
  render() {
    return (
      <div>
        <List>
          <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
            <ListItem button>
              <ListItemIcon><RestaurantIcon/></ListItemIcon>
              <ListItemText primary="POS"/>
            </ListItem>
          </Link>
          <Link to='/dashboard' style={{textDecoration: 'none', color: 'black'}}>
            <ListItem button>
              <ListItemIcon><AssignmentIcon/></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <AddProduct/>
          <AddCategory/>
        </List>
        <Divider />
        <List>
          <Link to='/logout' style={{textDecoration: 'none', color: 'black'}}>
            <ListItem button>
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Link>
        </List>
      </div>
    );
  }
}

export default SideListItem;
