
import React from 'react';
import {auth} from "@/server/auth";
import {redirect, useRouter} from "next/navigation";
import ProductForm from "@/app/dashboard/add-product/components/product-form";

async  function AddProducts() {



    const session  =  await auth()

    if(session?.user.role !== 'admin') redirect("/dashboard/settings")
    return (
        <ProductForm/>
    );
}

export default AddProducts;