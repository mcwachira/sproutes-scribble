"use client"
import React from 'react';
import {VariantsWithImagesTags, VariantsWithProduct} from "@/lib/infer-types";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import Image from 'next/image'
import formatPrice   from "@/lib/format-price";

type ProductTypes={
    variants:VariantsWithProduct[]
}
function Products({variants}:ProductTypes) {

    return (
        <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
            {variants.map((variant) => (
                <Link
                    className="py-2"
                    key={variant.id} href={`/products/${variant.id}?id=${variant.id}
            &productID=${variant.productID}
            &price=${variant.product.price}
            &title=${variant.product.title}
            &type=${variant.productType}
            &image=${variant.variantImages[0].url}`}>

                    <Image
                        className="rounded-md pb-2"
                        src={variant.variantImages[0].url}
                        width={720}
                        height={480}
                        alt={variant.product.title}
                        loading="lazy"/>
                    <div className="flex justify-between">
                        <div className="font-medium">
                            <h2>
                                {variant.productType}
                            </h2>
                        </div>

                        <div>
                            <Badge className="text-sm">

                                {formatPrice(variant.product.price)}
                            </Badge>
                        </div>
                    </div>
                </Link>
            ))}
        </main>
    );
}

export default Products;