"use client"
import React, {useMemo} from 'react';
import {useCartStore} from "@/lib/client-store";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import formatPrice from "@/lib/format-price";
import Image from 'next/image'
import {MinusCircle, PlusCircle} from "lucide-react";
import addCart from "@/components/cart/add-cart";
import {AnimatePresence, motion} from 'framer-motion'
import Lottie from "lottie-react";
import emptyCart from '@/public/empty-box.json'
import {createId} from "@paralleldrive/cuid2";
import {Button} from "@/components/ui/button";

function CartItems() {

    const {cart,  addToCart, removeFromCart, setCheckoutProgress}  = useCartStore()

    //memoize our total price  to prevent unnecessary re-renders
    const totalPrice = useMemo(() => {
        return cart.reduce((acc, item) => {
                            return     acc+item.price* item.variant.quantity
        }, 0)
    }, [cart])

    const priceInLetters = useMemo(() => {

        return [...totalPrice.toFixed(2).toString()].map((letter) => {
            return {
                letter,
                id: createId()
            }
        })
    }, [totalPrice])
    return (
        <motion.div
            animate={{opacity:1}}
            initial={{opacity:0}}
            transition={{delay:0.5, duration:0.5}}
            className="flex flex-col items-center"
        >

            {cart.length === 0 &&(
                <div className="flex-col w-full flex items-center justify-center">
                 <motion.div>

                     <h2 className="text-2xl text-muted-foreground text-center">

                         Your Cart is empty
                     </h2>

                     <Lottie className="h-64" animationData={emptyCart}/>
                 </motion.div>
                </div>
            )}

            {cart.length >0 && (
                <div className="max-h-80 w-full  overflow-y-auto">
                    <Table className="max-w-2xl mx-auto">
                        <TableHeader>
                            <TableRow>
                                <TableCell>
                                    Product
                                </TableCell>
                                <TableCell>
                                    Price
                                </TableCell>
                                <TableCell>
                                    Image
                                </TableCell>
                                <TableCell>
                                    Quantity
                                </TableCell>
                                {/*<TableCell>*/}
                                {/*Total*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>

                                    <TableCell>
                                        {formatPrice((item.price))}
                                    </TableCell>

                                    <TableCell>
                                        <div>
                                            <Image
                                                className="rounded-md"
                                                width={48}
                                                height={48}
                                                src={item.image}
                                                alt={item.name}
                                                priority/>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-between">
                                            <MinusCircle size={14}
                                                         onClick={() => {
                                                             removeFromCart({
                                                                 ...item,
                                                                 variant: {
                                                                     quantity: 1,
                                                                     variantID: item.variant.variantID
                                                                 }
                                                             })
                                                         }}
                                                         className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"/>
                                            <p className="text-md font-bold">

                                                {item.variant.quantity}
                                            </p>

                                                <PlusCircle
                                                    className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                                                    size={14} onClick={() => {
                                                    addToCart({
                                                        ...item,
                                                        variant: {
                                                            quantity: 1,
                                                            variantID: item.variant.variantID,

                                                        }

                                                    })
                                                }}


                                                />
                                            </div>


                                    </TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <motion.div className="flex items-center justify-center relative overflow-hidden my-4">
<span className="text-md">
    Total :$

</span>
                <AnimatePresence mode="popLayout">
                    {priceInLetters.map((letter, i) => (
                        <motion.div key={letter.id}>
                            <motion.span initial={{y:20}} animate={{y:0}} exit={{y:-20}} className="text-md inline-block">
                                {letter.letter}
                            </motion.span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            <Button
                onClick={() => setCheckoutProgress("payment-page")}
                className="max-w-md w-full" disabled={cart.length === 0}>
                Checkout
            </Button>
        </motion.div>
    );
}

export default CartItems;