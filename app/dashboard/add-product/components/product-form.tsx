"use client"
import {ProductSchema, zProductSchema} from "@/types/product-schema";
import React from 'react';
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


function ProductForm() {
    const form = useForm<zProductSchema>({
        resolver:zodResolver(ProductSchema),
        defaultValues:{
            title:"",
            description:"",
            price:0,
        },
        mode:"onChange",
    })

    const onSubmit = () => {

    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
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
                            <Button className="w-full" type="submit">Submit</Button>
                        </form>
                    </Form>


                </CardContent>

            </Card>
        </div>
    );
}

export default ProductForm;