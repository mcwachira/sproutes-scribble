import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Socials from "@/components/auth/socials";
import BackButton from "@/components/auth/BackButton";
type CardWrapperProps  = {
    children:React.ReactNode,
        cardTitle:string,
        backButtonHref:string,
        backButtonLabel:string,
        showSocials?:boolean
}

function AuthCard(
    {
        children,
        cardTitle,
        backButtonHref,
        backButtonLabel,
        showSocials,

    }
:CardWrapperProps ){
    return (
<Card>
    <CardHeader>
<CardTitle>
    {cardTitle}
</CardTitle>

    </CardHeader>

    <CardContent>
        {children}
    </CardContent>

    {showSocials && (
        <CardFooter>
            <Socials/>
        </CardFooter>
    )}

    <CardFooter>
        <BackButton label="" href=""/>
    </CardFooter>
</Card>
    );
}

export default AuthCard