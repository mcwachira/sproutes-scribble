"use client"
import React from 'react';
import {Session} from "next-auth";
import {signOut} from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import {LogOut, Moon, Settings, Sun, TruckIcon} from "lucide-react";


function UserButton({user}:Session) {
    if(user)

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Avatar className="w-7 h-7">
                    {user.image && (
                        <Image src={user.image} alt={user.name!} fill={true} />
                    )}
                    {!user.image && (
                        <AvatarFallback className="bg-primary/25">
                            <div className="font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </AvatarFallback>
                    )}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-6" align="end">
                <div className="mb-4 p-4 flex flex-col gap-1 items-center rounded-lg  bg-primary/10">
    {user.image && (
        <Image src={user.image} alt={user.name!} fill={true}  width={36} />
    )}
</div>
                <p className="font-bold text-xs">
                    {user.name}
                </p>
                <span className="text-xs font-medium text-secondary-foreground">
                    {user.email}
                </span>

                <DropdownMenuSeparator />
                <DropdownMenuItem          className="group py-2 font-medium cursor-pointer ">
                    <TruckIcon
                        size={14}
                        className="mr-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
                    />
                    MyOrders

                </DropdownMenuItem>
                <DropdownMenuItem          className="group py-2 font-medium cursor-pointer ">
                    <Settings
                        size={14}
                        className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out"
                    />

                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem          className="group py-2 font-medium cursor-pointer ">
                    <div className="relative items-center flex mr-3">
                        <Sun
                            className="mr-3 group-hover:text-yellow-600  absolute group-hover:rotate-180  dark:scale-0 dark:-rotate-90 transition-all duration-750 ease-in-out"
                            size={14}
                        />
                        <Moon
                            className="mr-3 group-hover:text-blue-400  scale-0 rotate-90 dark:rotate-0  dark:scale-100 transition-all ease-in-out duration-750"
                            size={14}
                        />
                        <p>
                            Theme <span>
                            theme
                        </span>
                        </p>
                    </div>


                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="py-2 group focus:bg-destructive/30 font-medium cursor-pointer "
                >
                    <LogOut
                        size={14}
                        className="mr-3  group-hover:scale-75 transition-all duration-300 ease-in-out"
                    />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );

}

export default UserButton;
