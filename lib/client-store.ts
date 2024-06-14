import {create} from "zustand";
import {cons} from "effect/List";
import cartItems from "@/components/cart/cart-items";


export type Variant ={
    variantID:number,
    quantity:number,
}


export type CartItem ={
    id:number,
    name:string,
    image:string,
    variant:Variant,
    price:number,
}

export type CartState ={
    cart:CartItem[],
    addToCart:(item:CartItem)=>void,
    removeFromCart:(item:CartItem)=>void
}
export const useCartStore = create<CartState>((set)  => ({
    cart:[],
    addToCart:(item) => set((state) => {

        //check if there are items  in the cart
        const existingItem = state.cart.find((cartItem) =>cartItem.variant.variantID=== item.variant.variantID)

        //update the  quantity of items in the cart
        if(existingItem){
            const updatedCart = state.cart.map((cartItem) =>  {
                if(cartItem.variant.variantID === item.variant.variantID){

                    return {
                        ...cartItem,
                        variant:{
                            ...cartItem.variant,
                            quantity:cartItem.variant.quantity + item.variant.quantity

                                                   }
                    }
                }

                return cartItem
            })

return{
                cart:updatedCart,
}
        }else {

            return {
                cart:[
                    ...state.cart,
                    {
                        ...item,
                        variant: {
                            variantID:item.variant.variantID,
                            quantity:item.variant.quantity,
                        }
                    }
                ]
            }
        }
    }
    ),
    removeFromCart:(item) => set((state) => {
        const updatedCart = state.cart.map((cartItem) => {
            if(cartItem.variant.variantID === item.variant.variantID){
                return{
                    ...cartItem,
                    variant:{
                        ...cartItem.variant,
                        quantity:cartItem.variant.quantity - 1
                    },
                }
            }

            return cartItem
        })

        return {cart: updatedCart.filter((item) => item.variant.quantity)}
    })
}))