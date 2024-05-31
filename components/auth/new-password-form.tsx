"use client"
import React, {useState} from 'react';
import AuthCard from "@/components/auth/auth-card";
import { useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useAction} from "next-safe-action/hooks";
import {emailSignIn} from "@/server/actions/email-signin";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";
import {NewPasswordSchema} from "@/types/new-password-schema";
import {newPassword} from "@/server/actions/new-password";
import {useSearchParams} from "next/navigation";



function NewPasswordForm() {

    const token = useSearchParams().get("token")
    console.log(token)

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");

    const form  = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver:zodResolver(NewPasswordSchema),
        defaultValues: {
            password:"",
            token:""
        },

    })

    const {execute, status} = useAction(newPassword, {
        onSuccess(data){
            if(data?.error) setError(data?.error)
            if(data?.success) setSuccess(data?.success)
        }
    })
    const onSubmit = (values:z.infer<typeof NewPasswordSchema>) => {

        execute({password:values.password, token})

    }
    return <AuthCard cardTitle="Enter a new password" backButtonHref="/auth/login" backButtonLabel="Back to Login" showSocials>

        <div>
            <Form  {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <div>


                        <FormField control={form.control} name="password" render={({field}) => <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input {...field}  type="password" autoComplete="current-password" placeholder="*****" />
                            </FormControl>
                            <FormDescription/>
                            <FormMessage/>
                        </FormItem>} />


                        <Button size={"sm"} variant={"link"} asChild>
                            <Link href="/auth/reset"> Forgot your Password</Link>
                        </Button>

                    </div>


                    <FormSuccess message={success}/>
                    <FormError message={error}/>
                    <Button type="submit" className={cn("w-full my-2", status ==="executing" ? "animate-pulse" : "")}>
                  Reset Password
                    </Button>


                </form>
            </Form>
        </div>

    </AuthCard>;
}

export default NewPasswordForm