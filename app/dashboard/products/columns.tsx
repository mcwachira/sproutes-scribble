"use client"
import React from 'react';
import {ColumnDef, Row} from "@tanstack/react-table";
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
import {useAction} from "next-safe-action/hooks";
import {deleteProduct} from "@/server/actions/delete-product";
import {toast} from "sonner";
import Link from "next/link";


type ProductColumn ={
    title:string,
    price:number,
    image:string,
    variants:any,
    id:number
}

// async function deleteProductWrapper(id:number)  {
//
//   const {data} = await deleteProduct({id})
//     if(!data) {
//         return new Error("No data found")
//     }
//     if (data.success) {
//         toast.success(data.success)
//     }
//     if (data.error) {
//         toast.error(data.error)
//     }
// }


const ActionCell = ({row}: { row:Row<ProductColumn> }) => {

    const { status, execute } = useAction(deleteProduct, {
        onSuccess: (data) => {
            if (data?.error) {
                toast.error(data.error)
            }
            if (data?.success) {
                toast.success(data.success)
            }
        },
        onExecute: () => {
            toast.loading("Deleting Product")
        },
    })


    const product= row.original
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>

            <Button variant={"ghost"} className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4"/>
            </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent>

            <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
                <Link href={`/dashboard/add-product?id=${product.id}`}>
                    Edit Product
                </Link>
            </DropdownMenuItem>
              <DropdownMenuItem className="dark:focus:bg-desstructive focus:bg-destructive/50 cursor-pointer"
                              onClick={() => execute({id:product.id})}
            >Delete Product</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    )
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

        cell:ActionCell

    },
]