import React from 'react';
import {auth} from "@/server/auth";
import Logo from "@/components/Navigation/logo";
import {Session} from "next-auth";
import UserButton from "@/components/Navigation/user-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from 'lucide-react'

async  function Navbar() {

    const session = await  auth()

    return (
<header>
    <nav className="py-8">
        <ul className="flex justify-between">
            <li>
  <Logo/>
            </li>

            {!session ? (<Button asChild>
                <Link href="/auth/login">
                    <LogIn size={16}/>
                    <span>
                        Login
                    </span>
                </Link>

            </Button>) :( <li>
                <UserButton user={session?.user} expires={session?.expires}/>

            </li>)}

        </ul>
    </nav>
</header>
    );
}

export default Navbar;
