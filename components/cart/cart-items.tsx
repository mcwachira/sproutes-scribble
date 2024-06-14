"use client"
import React, {useMemo} from 'react';
import {useCartStore} from "@/lib/client-store";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import formatPrice from "@/lib/format-price";
import Image from 'next/image'
import {MinusCircle, PlusCircle} from "lucide-react";
import addCart from "@/components/cart/add-cart";

function CartItems() {

    const {cart,  addToCart, removeFromCart}  = useCartStore()

    //memoize our total price  to prevent unnecessary re-renders
    const totalPrice = useMemo(() => {
        return cart.reduce((acc, item) => {
                            return     acc+item.price* item.variant.quantity
        }, 0)
    }, [cart])
    return (
        <div>

            {cart.length === 0 &&(
                <div>
                    <h1>
                        Cart is empty
                    </h1>
                </div>
            )}

            {cart.length >0 && (
                <div>
                    <Table>
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
                                <TableCell>
                                Total
                                </TableCell>
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
                                        <div className="flex items-center justify-between gap-2">
                                            <MinusCircle size={14}
                                                         onClick={() => {
                                                             removeFromCart({
                                                                 ...item,
                                                                 variant:{
                                                                     quantity:1,
                                                                     variantID:item.variant.variantID
                                                                 }
                                                             })
                                                         }}
                                                         className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"/>
                                            <p className="text-md font-bold">

                                                {item.variant.quantity}
                                            </p>

                                            <div className="flex items-center justify-between gap-2">
                                                <PlusCircle
                                                    className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                                                    size={14} onClick={() =>
                                                { addToCart({  ...item,
                                                    variant:{
                                                    quantity:1,
                                                        variantID:item.variant.variantID,

                                                    }

                                                })
                                                }}



                                                />
                                        </div>
                                        {item.variant.quantity}

                                        </div>

                                    </TableCell>
                                </TableRow>

                                ))}
                        </TableBody>
                    </Table>
                </div>
            ) }
        </div>
    );
}

export default CartItems;