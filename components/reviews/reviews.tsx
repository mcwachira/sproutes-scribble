import React from 'react';
import ReviewsForm from "@/components/reviews/reviews-form";
import Review from "@/components/reviews/review";
import {db} from "@/server";
import {reviews} from "@/server/schema";
import {desc, eq} from "drizzle-orm";

async function Reviews({productID}: {productID:number}) {

    const data = await db.query.reviews.findMany({
        where:eq(reviews.productID, productID),
        with:{user:true},
        orderBy:[desc(reviews.created)]
    })
    return (
<section className="py-8">
    <h2 className="text-2xl font-bold mb-4">

        Product Reviews
    </h2>

    <div className="flex gap-2 lg:gap-12 justify-stretch lg:flex-row flex-col">
        <div className="flex-1">
            <Review reviews={data}/>
        </div>
        <div className="flex-1 flex flex-col gap-2">
            <ReviewsForm/>
        </div>



    </div>
</section>
    );
}

export default Reviews;
