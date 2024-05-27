"use client"
import React from 'react';
import AuthCard from "@/components/auth/auth-card";
import { useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/types/login-schema";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";


function LoginForm() {

    const form  = useForm({
        resolver:zodResolver(LoginSchema),
        defaultValues: {
            email:"",
            password:""
        }

    })

    const onSubmit = (values:z.infer<typeof LoginSchema>) => {

        console.log(values)
    }
    return (
<AuthCard cardTitle="Welcome  back!" backButtonHref="/auth/register" backButtonLabel="Create a new Account" showSocials>

<div>
<Form  {...form}>

    <form onSubmit={form.handleSubmit(onSubmit)}>

        <div>
        <FormField control={form.control} name="email" render={({field}) => (
            <FormItem>
                <FormLabel/>
                <FormControl>
                    <Input {...field}  type="email" placeholder="example@example.com"  autoComplete="email"/>
                </FormControl>
                <FormDescription/>
                <FormMessage/>
            </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({field}) => (
            <FormItem>
                <FormLabel/>
                <FormControl>
                    <Input {...field}  type="password" autoComplete="current-password" placeholder="*****" />
                </FormControl>
                <FormDescription/>
                <FormMessage/>
            </FormItem>
        )} />


        <Button size={"sm"} variant={"link"} asChild>
            <Link href="/auth/reset"> Forgot your Password</Link>
        </Button>

    </div>

<Button type="submit" className="w-full my-2">
    {"lOGIN"}
</Button>


    </form>
</Form>
</div>

</AuthCard>
    );
}

export default LoginForm