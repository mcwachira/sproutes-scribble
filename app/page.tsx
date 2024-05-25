 import React from 'react';
import getPosts from "@/server/actions/get-posts";
 import createPosts from "@/server/actions/create-posts";
 import {Button} from "@/components/ui/button";


async  function Home() {
    const {error, success} = await getPosts()
    console.log(success)

    if(error){
        throw  new Error(error)
    }

    if(success)
    return (
        <main>

          <h1>
            Welcomed to the home page
          </h1>
            <Button>
                Click me
            </Button>
        </main>
    );
}





export default Home;
