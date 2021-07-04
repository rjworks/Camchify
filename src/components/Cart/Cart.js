import React from 'react';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import useStyles from './styles';
import CartItem from "./CartItem/CartItem";
import {Link} from "react-router-dom";

const Cart = ({cart, handleEmptyCart, handleRemoveFromCart, handleUpdateCartQuantity}) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart.&nbsp;
            <Link to="/" className={classes.link}>
                Start adding some!
            </Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem
                            item={item}
                            onUpdateQuantity={handleUpdateCartQuantity}
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_code}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained"
                            color="secondary" onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button
                        component={Link} to="/checkout"
                        className={classes.checkoutButton} size="large" type="button" variant="contained"
                        color="primary">
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Loading...';

    return (
        <div>
            <Container>
                <div className={classes.toolbar}/>
                <Typography className={classes.title} variant="h3" gutterBottom>
                    Your Shopping Cart
                </Typography>
                {cart.line_items.length === 0 ? <EmptyCart/> : <FilledCart/>}
            </Container>
        </div>
    );
};

export default Cart;
