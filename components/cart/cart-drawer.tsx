"use client"
import React from 'react';
import {useCartStore} from "@/lib/client-store";
import {BadgeIcon, ShoppingBag} from "lucide-react";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer";
import {AnimatePresence, motion} from "framer-motion";
import CartItems from "@/components/cart/cart-items";

function CartDrawer() {

    const {cart}   = useCartStore()
    console.log(cart?.length)
    return (
          <Drawer>
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

              <DrawerContent>
                  <DrawerHeader>
                      <h1>
                          Cart Stuff
                      </h1>
                      <CartItems/>
                  </DrawerHeader>
              </DrawerContent>

          </Drawer>
    );
}

export default CartDrawer;