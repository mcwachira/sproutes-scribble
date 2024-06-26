import React from 'react';
import {BarChart, Package, PenSquare, Settings, Truck} from "lucide-react";
import {auth} from "@/server/auth";
import DashboardNav from "@/components/Navigation/dashboard-nav";
import Toaster from "@/components/providers/toaster";
import {toast} from "sonner";


// ...

function App() {
    return (
        <div>
            <Toaster/>
            <button onClick={() => toast('My first toast')}>
                Give me a toast
            </button>
        </div>
    )
}

export default async function DashboardLayout({
    children,}:{
    children:React.ReactNode
}) {


    const session = await auth()


    const userLinks = [
        {
            label:"Orders",
            path:"/dashboard/orders",
            icon:<Truck size={16}/>
        },
        {
            label:"Settings",
            path:"/dashboard/settings",
            icon:<Settings size={16}/>
        },

    ] as const

    const adminLinks = session?.user.role ==='admin'?[
        {
            label:"Analytics",
            path:"/dashboard/analytics",
            icon:<BarChart size={16}/>
        },
        {
            label:"Create",
            path:"/dashboard/add-product",
            icon:<PenSquare size={16}/>
        },
        {
            label:"Products",
            path:"/dashboard/products",
            icon:<Package size={16}/>
        },
    ]:[]

    const allLinks = [...adminLinks, ...userLinks]
    return (
        <div>


<DashboardNav allLinks={allLinks}/>

            {children}


</div>
    );
}

