"use server"
import {Resend} from 'resend'
import getBaseUrl from "@/lib/base-url";

const resend  = new Resend(process.env.RESEND_API_KEY)

const domain  =  getBaseUrl()
export const sendVerificationEmail = async(email:string, token:string) => {
    const confirmationLink  =  `${domain}/auth/new-verification?token=${token}`
    console.log(email + "email")
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Sprouts and Scribble - Confirmation Email",
        html: `<p>Click here <a href='${confirmationLink}'>confirm your Account</a></p>`,
    })

    if(error) return console.log(error)
    if(data) return data
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-password?token=${token}`
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Sprouts and Scribble - Confirmation Email",
        html: `<p>Click here <a href='${confirmLink}'>reset your password</a></p>`,
    })
    if (error) return console.log(error)
    if (data) return data
}

export const sendTwoFactoTokenByEmail = async(email:string, token:string) => {
    const confirmationLink  =  `${domain}/auth/new-verification?token=${token}`
    console.log(email + "email")
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Sprouts and Scribble - Confirmation Email",
        html: `<p>Your Confirmation Code: ${token}</p>`,
    })

    if(error) return console.log(error)
    if(data) return data
}