import React from 'react';
import useStyles from './styles';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";

const CartItem = ({item, onUpdateQuantity, onRemoveFromCart}) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_code}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => onUpdateQuantity(item.id, item.quantity-1)}>
                        -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateQuantity(item.id, item.quantity+1)}>
                        +
                    </Button>
                </div>
                <Button type="button" variant="contained" color="secondary"
                        onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
