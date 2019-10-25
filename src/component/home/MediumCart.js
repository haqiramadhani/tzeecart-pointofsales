import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from "@material-ui/core/IconButton";
import {Hidden} from "@material-ui/core";
// import Cart from "./Cart";

const useStyles = makeStyles({
  list: {
    width: '80vw',
  },
  fullList: {
    width: 'auto',
  },
});

export default function MediumCart() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {/*<Cart/>*/}
      </List>
    </div>
  );

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          {/*<Cart/>*/}
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {/*<Button onClick={toggleDrawer('left', true)}>Open Left</Button>*/}
      {/*<Button onClick={toggleDrawer('right', true)}><ShoppingCartIcon/></Button>*/}
      {/*<Button onClick={toggleDrawer('top', true)}>Open Top</Button>*/}
      {/*<Button onClick={toggleDrawer('bottom', true)}>Open Bottom</Button>*/}
      <Hidden mdUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer('right', true)}
          edge="start"
        >
          <ShoppingCartIcon />
        </IconButton>
      </Hidden>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer('top', false)}
        onOpen={toggleDrawer('top', true)}
      >
        {fullList('top')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
        onOpen={toggleDrawer('bottom', true)}
      >
        {fullList('bottom')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {sideList('right')}
      </SwipeableDrawer>
    </div>
  );
}
