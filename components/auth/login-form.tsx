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

import {useRouter} from "next/navigation";
import {LoginSchema} from "@/types/login-schema";




function LoginForm() {


    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");

    const form  = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    })

    const {execute, status} = useAction(emailSignIn, {
        onSuccess(data){
            if(data.error) setError(data.error)
            if(data.success) setSuccess(data.success)
        }
    })
    const onSubmit = (values:z.infer<typeof LoginSchema>) => {

        execute(values)

    }
    return <AuthCard cardTitle="Welcome  back!" backButtonHref="/auth/register" backButtonLabel="Create a new Account" showSocials>

    <div>
    <Form  {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)}>

            <div>
            <FormField control={form.control} name="email" render={({field}) => <FormItem>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input {...field}  type="email" placeholder="example@example.com"  autoComplete="email"/>
                    </FormControl>
                    <FormDescription/>
                    <FormMessage/>
                </FormItem>} />

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
        {"Login"}
    </Button>


        </form>
    </Form>
    </div>

    </AuthCard>;
}

export default LoginForm