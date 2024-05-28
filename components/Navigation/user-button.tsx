"use client"
import React from 'react';
import {Session} from "next-auth";
import {signOut} from "next-auth/react";
import {sign} from "node:crypto";

function UserButton({user}:Session) {
    return (
        <div>
            <h1>
                {user?.email}
            </h1>

            <button onClick={()=>  signOut()}> sign out</button>
        </div>
    );
}

export default UserButton;