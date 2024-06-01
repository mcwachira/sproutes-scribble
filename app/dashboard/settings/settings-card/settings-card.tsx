"use client"
import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Session} from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {SettingsSchema} from "@/types/settings-schema";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";
import {useAction} from "next-safe-action/hooks";
import {Settings} from "@/server/actions/settings";

type SettingsForm={
    session:Session
}

function SettingsCard(session:SettingsForm) {


    const [error, setError] = useState<string | null >(null)
    const [success, setSuccess] = useState<string | null >(null)


    const [avatarUploading, setAvatarUploading] = useState(false)
    console.log(session?.session)


    const form = useForm<z.infer<typeof  SettingsSchema>>({
        resolver:zodResolver(SettingsSchema),
        defaultValues:{
            password: undefined,
            newPassword: undefined,
            name:session.session.user?.name ||undefined,
            email:session.session.user?.email ||undefined,
            image:session.session.user?.image ||undefined,
            isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || undefined
        }
    })


    const {execute, status} =  useAction(Settings, {
        onSuccess:(data) => {
            if(data?.success) setSuccess(data.success)
            if(data?.error) setError(data.error)

        },
        onError:(error) => {
            setError('Something wen wrong')
        }
    })
    const onSubmit = (values:z.infer<typeof SettingsSchema>) => {
execute(values)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Settings </CardTitle>
                <CardDescription>Update your account settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" disabled={status === "executing"} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>


                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <div className="flex items-center">
                                        {!form.getValues("image") && (
                                            <div className="font-bold">

                                                {session.session.user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        {

                                            form.getValues("image") && (
                                                <Image src={form.getValues("image")!}  width={42} height={42} className="rounded-full" alt="User Image "/>
                                            )
                                        }
                                    </div>
                                    <FormControl>
                                        <Input placeholder="User Image" type='hiddden' disabled={status === "executing"} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>


                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="********" disabled={status === "executing"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>


                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="********" disabled={status === "executing" ||  session.session.user.isOAuth === true} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>


                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Two Factor Authentication </FormLabel>
                                    <FormDescription>
                                        Enable Two Factor Authentication
                                    </FormDescription>
                                    <FormControl>
                                     <Switch disabled={
                                         status === "executing"  || session.session.user.isOAuth === true

                                     }/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>


                            )}
                        />

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" disabled={status === 'executing' || avatarUploading}>

                            Update your settings
                        </Button>
                    </form>
                </Form>

            </CardContent>

        </Card>

    );
}

export default SettingsCard;