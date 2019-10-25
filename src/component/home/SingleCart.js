import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import NumberFormat from "react-number-format";

const styles = () => ({
  card: {
    width: '100%',
    display: 'flex',
    margin: "3px",
  },
  details: {
    display: 'flex-end',
    flexDirection: 'column',
  },
  content: {
    // flex: '1 0 auto',
  },
  image: {
    width: 170,
    height: 110,
    margin: "5px",
  },
  controls: {
    display: 'flex-end',
    alignItems: 'center',
    justifyContent: "center"
  },
});

class Cart extends Component {
  render () {
    // console.log(this.props);
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardMedia
            className={classes.image}
            image={this.props.image}
          />
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textSecondary">
              {this.props.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Rp <NumberFormat displayType={'text'} value={this.props.price} thousandSeparator='.' decimalSeparator=','/>
            </Typography>
          </CardContent>
          <div className={classes.controls}>
              <ButtonGroup variant="outlined" size="small" aria-label="small contained button group">
                <Button onClick={() => {this.props.reduce(this.props.id)}}>-</Button>
                <Button>{this.props.qty}</Button>
                <Button onClick={() => {this.props.add(this.props.id)}}>+</Button>
              </ButtonGroup>
          </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Cart);
