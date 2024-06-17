"use client"
import React from 'react';
import {useCartStore} from "@/lib/client-store";
import {BadgeIcon, ShoppingBag} from "lucide-react";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer";
import {AnimatePresence, motion} from "framer-motion";
import CartItems from "@/components/cart/cart-items";
import CartMessage from "@/components/cart/cart-message";
import Payment from "@/components/cart/payment";
import OrderConfirmed from "@/components/cart/order-confirm";
import CartProgress from "@/components/cart/cart-progress";


function CartDrawer() {

    const {cart, checkoutProgress, setCheckoutProgress, cartOpen, setCartOpen}   = useCartStore()
    console.log(cart?.length)
    return (
          <Drawer open={cartOpen} onOpenChange={setCartOpen}>
              <DrawerTrigger>
                  <div className="relative px-2">
                      <AnimatePresence>

                          {cart.length >0  && (
                              <motion.span animate={{scale:1, opacity:1}}
                                           initial={{opacity:0, scale:0}}
                                           exit={{scale:0}}
                                            className="absolute flex items-center justify-center -top-0.5 right-0.5 w-4 h-4  dark:bg-primary bg-primary text-white text-xs font-bold rounded-full">

                          {cart.length}
                              </motion.span>

                          ) }
                      </AnimatePresence>
                      <ShoppingBag/>
                  </div>
              </DrawerTrigger>

              <DrawerContent className="fixed bottom-0 left-0 max-h-[70vh] min-h-[50vh] ">
                  <DrawerHeader>
                 <CartMessage/>
                  </DrawerHeader>

                  <CartProgress/>

                  <div className="overflow-auto pd-4">
                      {checkoutProgress === "cart-page" && <CartItems />}
                      {checkoutProgress === 'payment-page'  && <Payment/>}
                      {checkoutProgress === 'confirmation-page'  && <OrderConfirmed/>}
                  </div>


              </DrawerContent>

          </Drawer>
    );
}

export default CartDrawer;