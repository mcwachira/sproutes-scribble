import React from 'react';
import ReviewsForm from "@/components/reviews/reviews-form";

function Reviews({productID}: {productID:number}) {
    return (
<section className="py-8">
    <h2 className="text-2xl font-bold mb-4">

        Product Reviews
    </h2>

    <div>
        <ReviewsForm/>
    </div>
</section>
    );
}

export default Reviews;

