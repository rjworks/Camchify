import './App.css';
import {Cart, Checkout, Navbar, Products} from './components';
import {useEffect, useState} from "react";
import {commerce} from "./lib/commerce";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const fetchProducts = async() => {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async() => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async(productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const handleUpdateCartQuantity = async(productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity});
        setCart(cart);
    }

    const handleRemoveFromCart = async(productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async() => {
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async() => {
        const newCart = commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch(e) {
            setErrorMessage(e.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleEmptyCart={handleEmptyCart}
                            handleUpdateCartQuantity={handleUpdateCartQuantity}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                            cart={cart}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
