"use client"
import {ProductSchema, zProductSchema} from "@/types/product-schema";
import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {DollarSign} from "lucide-react";
import Tiptap from "@/app/dashboard/add-product/components/tip-tap";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAction} from "next-safe-action/hooks";
import {createProduct} from "@/server/actions/create-product";
import {useRouter, useSearchParams} from "next/navigation";
import {toast} from "sonner";
import {getProduct} from "@/server/actions/get-products";
import {useEditor} from "@tiptap/react";


function ProductForm() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const editMode = searchParams.get("id")
    const form = useForm<zProductSchema>({
        resolver:zodResolver(ProductSchema),
        defaultValues:{
            title:"",
            description:"",
            price:0,
        },
        mode:"onChange",
    })


    const checkProduct = async(id:number) => {
        if(editMode){
            const data = await getProduct(id)
            if(data.error){
                toast.error(data.error)
                router.push("/dashboard/products")

                return
            }

            if(data.success){
                const id = parseInt(editMode)
                form.setValue("title", data.success.title)
                form.setValue("description", data.success.description)
                    form.setValue("price", data.success.price)
                    form.setValue("id", id)
            }
        }

    }

    //checks if component is in edit mode during mounting

    useEffect(() => {
        if(editMode){
      checkProduct(parseInt(editMode))
        }
    },[])
    const {execute, status} =useAction(createProduct, {
        onSuccess:(data) => {
            if (data?.error) {
                toast.error(data.error)
            }
            if (data?.success) {
                router.push("/dashboard/products")
                toast.success(data.success)
            }
        },

        // onExecute:(data) => {

        // if(editMode){
        //toast.loading('editing a product')

        //}
        // if(!editMode){
        //     toast.loading('Creating product')

        //}
        // },
        onError:(error) => console.log(error),
    })
    const onSubmit = async(values:zProductSchema) => {

        execute(values)
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {editMode ? <span>
                            Edit Product
                        </span>
                        : <span>
                                Create Product
                            </span>
                        }

                    </CardTitle>
                    <CardDescription>{editMode ? "Make changes to existing products":"Add a brand new product"}</CardDescription>
                </CardHeader>
                <CardContent>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem className="py-2">
                                        <FormLabel>Product title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="product name" {...field} />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                         <Tiptap val={field.value}/>
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Product Price</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-3">
                                                <DollarSign size={40} className="p-2 bg-muted rounded-md"/>

                                            <Input placeholder="Your price in Usd " type="number"  {...field} step="0.1"
                                                   min={0}/>

                                            </div>
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={status ==="executing" || !form.formState.isValid || !form.formState.isDirty} className="w-full" type="submit">

                                {editMode ? "Save changes":"Create Product"}
                            </Button>
                        </form>
                    </Form>


                </CardContent>

            </Card>
        </div>
    );
}

export default ProductForm;