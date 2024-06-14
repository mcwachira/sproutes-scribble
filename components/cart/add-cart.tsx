"use client"
import React, {useState} from 'react';
import {useCartStore} from "@/lib/client-store";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {redirect, useSearchParams} from "next/navigation";
import {Nunito} from "next/dist/compiled/@next/font/dist/google";
import {toast} from "sonner";

function AddCart() {
    const {addToCart} = useCartStore()
    const[quantity, setQuantity] = useState(1)

    const params = useSearchParams()
    const id = Number(params.get("id"))
    const productID = Number(params.get('productID'))
    const title = params.get('title')
    const type    =  params.get('type')
    const price =  Number(params.get('price'))

    const  image = params.get("image")

if(!id || !productID || !title || !type || !price || !image){
    toast.error("product not found")
    return redirect('/')
}
    return (
        <>
            <div className="flex items-center gap-4 mt-6 my-4 justify-stretch">
                <Button
                    onClick={() => {
                        if(quantity > 1){
                            setQuantity(quantity - 1)
                        }
                    }}
                    variant={'secondary'} className="text-primary">
                    <Minus size={18} strokeWidth={3}/>

                </Button>

                <Button>
                    Quantity:{quantity}
                </Button>

                <Button
                    onClick={() => {

                            setQuantity(quantity + 1)
                        }
                    }
                    variant={'secondary'} className="text-primary">
                    <Plus size={18} strokeWidth={3}/>

                </Button>
            </div>
            <Button onClick={() => {
                toast.success(`Added ${title} to the cart`)
                addToCart({id:productID, variant:{variantID:id, quantity },name:title + " " + type,price, image} )

            }}>
                Add to Cart
            </Button>

        </>


    );
}

export default AddCart;