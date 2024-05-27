"use client"
import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";

type BackButtonProps={
    href:string,
        label:string,
}

function BackButton({href, label}: BackButtonProps) {
    console.log(label)
    return (
     <Button className="font-medium w-full">
         <Link aria-label={label} href={href}>

             {label}
         </Link>
     </Button>
    );
}

export default BackButton;