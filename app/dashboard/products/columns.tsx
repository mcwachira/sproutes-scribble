"use client"
import React from 'react';
import {ColumnDef} from "@tanstack/react-table";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";

type ProductColumn ={
    title:string,
    price:number,
    image:string,
    variants:any,
    id:number
}

export const columns:ColumnDef<ProductColumn>[]=[
{
    accessorKey:"id" ,
    header:'ID'

},
    {
        accessorKey:"title" ,
        header:'Title'

    },
    {
        accessorKey:"variants" ,
        header:'Variants'

    },
    {
        accessorKey:"price" ,
        header:'Price',
        cell:({row}) => {{
            const price = parseFloat(row.getValue("price"))
            const formatted =  new Intl.NumberFormat("en-US", {
                currency:"USD",
                style:"currency",
            }).format(price)

            return <div className="font-medium text-sm"> {formatted}</div>
        }}

    },
    {
        accessorKey:"image" ,
        header:'Image',
        cell:({row}) => {
            const cellImage = row.getValue("image") as string
            const cellTitle = row.getValue('title') as string

            return (
                <div>
                    <Image  src={cellImage} alt={cellTitle} width={50} height={50} className="rounded-md"/>
                </div>
            )
}

    },
    {
        accessorKey:"actions" ,
        header:'Actions',

        cell:({row}) => {
            const product = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">Edit Product</DropdownMenuItem>
                        <DropdownMenuItem className="dark:focus:bg-desstructive focus:bg-destructive/50 cursor-pointer">Delete Product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            )
        }

    },
]