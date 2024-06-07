"use client"
import React from 'react';
import {VariantsWithImagesTags} from "@/lib/infer-types";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {VariantSchema} from "@/types/variant-schema";
import {Button} from "@/components/ui/button";
import {InputTags} from "@/app/dashboard/products/input-tags";
import {Input} from "@/components/ui/input";
import VariantImages from "@/app/dashboard/products/variant-images";

export const ProductVariant = ({
    editMode,
    productID ,
    variant,
    children

                        }:{
    editMode:boolean
    productID?  :number
    variant?:VariantsWithImagesTags
    children:React.ReactNode
}) =>  {

    const onSubmit = () => {

    }

    const form =  useForm<z.infer<typeof VariantSchema>>({
        resolver:zodResolver(VariantSchema),
        defaultValues:{
   color:"#000000",
            editMode:editMode,
            id:undefined,
            productID,
            productType:"Black Notebook"
        },
        mode:"onChange",
    })


    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="lg:max-w-screen overflow-y-scroll max-h-[720px] rounded-md">
                <DialogHeader>
                    <DialogTitle>{editMode ? "Edit": "Create"} your variant</DialogTitle>
                    <DialogDescription>
                  Manage your product variants here. You can add tags, images and more.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="productType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Variant Title</FormLabel>
                                    <FormControl>
                                        <Input

                                            placeholder="Pick a title for your variant"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Variant Color</FormLabel>
                                    <FormControl>
                                        <Input type="color" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <InputTags
                                            {...field}
                                            onChange={(e) => field.onChange(e)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <VariantImages/>

                        {editMode && variant && (
                            <Button type="button" onClick={(e) => e.preventDefault()}>

                                Delete Variant
                            </Button>
                        )}
                        <Button type="submit">

                            {editMode ? "Update Variant":"Create Variant"}

                        </Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    );
}

