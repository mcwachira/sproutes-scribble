import React from 'react';
import {Session} from "next-auth";

function UserButton({user}:Session) {
    return (
        <div>
            <h1>
                {user?.email}
            </h1>


        </div>
    );
}

export default UserButton;