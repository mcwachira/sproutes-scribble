import React from 'react';
import {CheckCircle2} from "lucide-react";

function FormError({message}: {message:string}) {

    if(!message) return null
    return (

        <div className="bg-teal-400/25 text-sm font-md my-4 flex items-center gap-2 text-secondary-foreground p-3">
            <CheckCircle2 className="w-4 h-4"/>
            <p>{message}</p>
        </div>



    );
}

export default FormError;