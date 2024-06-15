import React, {useState} from 'react';
import {AddressElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useCartStore} from "@/lib/client-store";
import {Button} from "@/components/ui/button";
import {createPaymentIntent} from "@/server/actions/create-payment-intent";

function PaymentForm({totalPrice}:{totalPrice:number}) {

    const stripe =useStripe()
    const elements = useElements()
    const {cart} = useCartStore()

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    const handleSubmit = async(e:React.FormEvent) => {

        e.preventDefault()
        setLoading(true)
        if(!stripe || !elements){
            setLoading(false)

            return
        }

        const {error:submitError} = await elements.submit()

        if(submitError){
            setErrorMessage(submitError.message!)
            setLoading(false)

            return
        }

        const {data} =await createPaymentIntent({

            amount:totalPrice,
            currency: 'usd',
        cart:cart.map((item) => ({
            quantity:item.variant.quantity,
            productID:item.id,
            title:item.name,
            price:item.price,
            image:item.image

        })),

        })


        if(data?.error){
            setErrorMessage('error')
            setLoading(false)
            return
        }
        if(data?.success){

            const {error}  = await stripe.confirmPayment({
                elements,
                clientSecret:data.success.clientSecretID!,
                redirect:"if_required",
                confirmParams:{
                    return_url:'http://localhost:3000/success',
                    receipt_email:data.success.user as string
                },
            })

            if(error){
                setErrorMessage(error.message!)
                setLoading(false)
                return
            }else{
                setLoading(false)
                console.log('save the order')
            }
        }

    }
    return (

        <form onSubmit={handleSubmit}>
            <PaymentElement/>
            <AddressElement
                options={{
                    mode: "shipping",
                }}
            />
            <div>
                <Button
                    disabled={!stripe || !elements || loading}
                    className="max-w-md w-full disabled:opacity-25"
                >
          <span>
            {loading ? <span>Processing...</span> : <span>Pay now</span>}
          </span>
                </Button>
            </div>
        </form>
    );
}

export default PaymentForm;