"use client"
import React, {useEffect, useState} from 'react';
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
import {createVariant} from "@/server/actions/create-variant";
import {useAction} from "next-safe-action/hooks";
import {toast} from "sonner";
import {deleteVariant} from "@/server/actions/delete-variant";

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

    const [open, setOpen] = useState(false)


    const {execute, status} = useAction(createVariant, {
        // onExecute(){
        //     toast.loading('Creating a variant', {duration:1})
        //     setOpen(false)
        // },
        onSuccess(data){
            if(data?.error){

                toast.error(data.error)
            }
            if(data?.success){
                toast.success(data.success)
            }
        }
    })

    const variantAction = useAction(deleteVariant, {
        // onExecute(){
        //     toast.loading('deleting variant', {duration:1})
        //     setOpen(false)
        // },
        onSuccess(data){
            if(data?.error){

                toast.error(data.error)
            }
            if(data?.success){
                toast.success(data.success)
            }
        }
    })
    const onSubmit = (values: z.infer<typeof VariantSchema>) => {
        console.log(values)
execute(values)
    }

    const form =  useForm<z.infer<typeof VariantSchema>>({
        resolver:zodResolver(VariantSchema),
        defaultValues:{
            tags: [],
   color:"#000000",
            variantImages: [],
            editMode:editMode,
            id:undefined,
            productID,
            productType:"Black Notebook"
        },
        mode:"onChange",
    })

    const setEdit = () => {
        if (!editMode) {
            form.reset()
            return
        }
        if (editMode && variant) {
            form.setValue("editMode", true)
            form.setValue("id", variant.id)
            form.setValue("productID", variant.productID)
            form.setValue("productType", variant.productType)
            form.setValue("color", variant.color)
            form.setValue(
                "tags",
                variant.variantTags.map((tag) => tag.tag)
            )
            form.setValue(
                "variantImages",
                variant.variantImages.map((img) => ({
                    name: img.name,
                    size: img.size,
                    url: img.url,
                }))
            )
        }
    }

    useEffect(() => {
        setEdit()
    }, [])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
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

                        <div className="flex gap-4 items-center">


                        {editMode && variant && (
                            <Button type="button"
                                    // disabled={variantAction.status === 'executing' || !form.formState.isValid || !form.formState.isDirty}
                                    onClick={(e) => {
                                e.preventDefault()

                            variantAction.execute({id:variant.id})
                            }
                            }>

                                Delete Variant
                            </Button>
                        )}
                        <Button type="submit" disabled={status === 'executing' || !form.formState.isValid || !form.formState.isDirty}>

                            {editMode ? "Update Variant":"Create Variant"}

                        </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    );
}

