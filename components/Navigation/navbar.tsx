import React from 'react';
import {auth} from "@/server/auth";
import Logo from "@/components/Navigation/logo";
import {Session} from "next-auth";
import UserButton from "@/components/Navigation/user-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from 'lucide-react'
import CartDrawer from "@/components/cart/cart-drawer";

async  function Navbar() {

    const session = await  auth()

    return (
<header>
    <nav className="py-8">
        <ul className="flex justify-between  items-center md:gap-8 gap-4 md:flex-row">
            <li className="flex flex-1">
                <Link href="/" aria-label="Sproutes and scribble ">
                <Logo/>
                </Link>

            </li>

            <li className="relative flex items-center hover:bg-muted">
                <CartDrawer/>
            </li>
            {!session ? (<Button asChild>
                <Link href="/auth/login">
                    <LogIn size={16}/>
                    <span>
                        Login
                    </span>
                </Link>

            </Button>) :( <li className="relative flex items-center hover:bg-muted">
                <UserButton user={session?.user} expires={session?.expires}/>

            </li>)}

        </ul>
    </nav>
</header>
    );
}

export default Navbar;
