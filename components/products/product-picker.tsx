"use client"
import React from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";

function ProductPicker({id, color,title, price, productType, productID, image}:{
   id: number   ,
    color: string  ,
    title:string,
    price:string,
    productType: string,
    productID: number,
image:string}) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedColor = searchParams.get("type" || productType)
    console.log(selectedColor)
    return (
        <div
            style={{background: color}}
            className={cn(
                "w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out hober: opacity-75",
                selectedColor === productType ? "opacity-100" : "opacity-50"
            )}
            onClick={() =>
                router.push(
                    `/products/${id}?id=${id}&productID=${productID}&price=${price}&title=${title}&type=${productType}&image=${image}`,
                    {scroll: false}
                )
            }
        ></div>
    );
}

export default ProductPicker;