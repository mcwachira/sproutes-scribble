"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import { FcGoogle} from 'react-icons/fc'
import {FaGithub} from "react-icons/fa"

function Socials() {
    return (
<div className="flex flex-col items-center w-full gap-4">
    <Button variant={"outline"} className="flex gap-4 w-full " onClick={() => signIn('google', {redirect:false, callbackUrl:"/"})}>
        Sign with Google
        <p>
            <FcGoogle w-5 h-5/>
        </p>
    </Button>

    <Button variant={"outline"} className="flex gap-4 w-full "  onClick={() => signIn('github', {redirect:false, callbackUrl:"/"})}>
        Sign in with Github
        <p>
            <FaGithub w-5 h-5/>
        </p>
    </Button>
</div>
    );
}

export default Socials;