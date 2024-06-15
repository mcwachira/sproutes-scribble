"use client"
import React from 'react';
import {motion} from "framer-motion";
import {useCartStore} from "@/lib/client-store";
import {Elements} from "@stripe/react-stripe-js";

import PaymentForm from "@/components/cart/payment-form";
import getStripe from "@/lib/get-stripe";

const stripe = getStripe()
function Payment() {

    const {cart}  = useCartStore()

    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.price * item.variant.quantity
    }, 0)
    return (
 <motion.div>
     <Elements stripe={stripe} options={{
         mode:"payment",
         currency:"usd",
         amount:totalPrice,
     }}>
         <PaymentForm totalPrice={totalPrice}/>
     </Elements>
 </motion.div>
    );
}

export default Payment;