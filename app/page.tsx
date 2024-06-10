 import React from 'react';
 import {db} from "@/server";
 import {productVariants} from "@/server/schema";
 import Products from "@/components/products/products";



async  function Home() {

    const data = await db.query.productVariants.findMany({
        with:{
            variantImages:true,
            variantTags:true,
            product:true
            },



        orderBy:(productVariants, {desc}) => [desc(productVariants.id)],

    })

    return (
        <main className="">
            <Products variants={data}/>
        </main>
    );
}





export default Home;
