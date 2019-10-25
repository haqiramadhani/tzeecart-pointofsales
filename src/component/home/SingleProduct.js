import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NumberFormat from 'react-number-format';
import {Grid} from "@material-ui/core";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let cart = {};

  const handleAddToCart = () => {
    cart = {
      id: props.id,
      name: props.name,
      image: props.image,
      price: props.price,
      qty: 1
    };
    props.cart(cart);
    // console.log('cart', cart);
  };
  // onClick={this.props.cart()}
  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <Grid container>
            <Grid item>
              <IconButton aria-label="settings">
                <EditProduct id={props.id} name={props.name} category={props.category} image={props.image} price={props.price} desc={props.desc}/>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="settings">
                <DeleteProduct id={props.id} />
              </IconButton>
            </Grid>
          </Grid>
        }
        subheader={props.name}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Paella dish"
          onClick={()=>{handleAddToCart()}}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Rp <NumberFormat displayType={'text'} value={props.price} thousandSeparator='.' decimalSeparator=','/>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={()=>{handleAddToCart()}}
        >
          <AddCircleOutlineIcon/>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {props.desc}
            {/*{cart.name}*/}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
