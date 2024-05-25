import React from 'react';
import getPosts from "@/actions/get-posts";

async function Home() {

    const posts  = await getPosts()
    console.log(posts)
    return (
        <div>

          <h1>
            Welcomed to the home page
          </h1>
        </div>
    );
}

export default Home;