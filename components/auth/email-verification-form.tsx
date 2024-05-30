"use client"
import React, {useCallback, useEffect, useState} from 'react';
import {useSearchParams, useRouter} from "next/navigation";
import {newVerification} from "@/server/actions/tokens";
import AuthCard from "@/components/auth/auth-card";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";

function EmailVerificationForm() {

    const token = useSearchParams().get("token")
    console.log(token)
    const router = useRouter()
    const [error,setError ] = useState("");
    const [success, setSuccess] = useState("")

    //USE Callback to make it run only once
    const handleVerification = useCallback(() => {
        if(success || error) return
        if(!token){
            setError('No token found')
        }

        newVerification(token).then((data) => {
            if(data.error){
                setError(data.error)
            }
            if(data.success){
                setSuccess(data.success)
                router.push('/auth/login')
            }
        })

    },[])


    useEffect(() => {
handleVerification()
    }, [])
    return (


            <AuthCard backButtonLabel="Back to Login" backButtonHref="/auth/login" cardTitle="Verify your account">
                <div className='flex flex-col w-full items-center justify-center'>
                    <p>{!success && !error ? "Verifying Email...": null}</p>

                    <FormSuccess message={success}/>
                    <FormError message={error}/>
                </div>
            </AuthCard>


    );
}

export default EmailVerificationForm;