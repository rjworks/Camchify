import React, {useEffect, useState} from 'react';
import {Paper, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import useStyles from './styles';
import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";
import {commerce} from "../../../lib/commerce";

const steps = ['Shipping address', 'Payment details']

const Checkout = ({cart, onCaptureCheckout, error, order}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch(e) {
                console.log(e.message);
            }
        }

        generateToken();
    }, []);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>Confirmation</div>
    )

    const Form = () => activeStep === 0
        ? <AddressForm next={next} checkoutToken={checkoutToken}/>
        : <PaymentForm nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} backStep={backStep}
                       shippingData={shippingData} checkoutToken={checkoutToken}/>

    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
