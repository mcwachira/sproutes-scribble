import React, {useMemo} from 'react';
import {ReviewsWithUser} from "@/lib/infer-types";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";
import {getReviewAverage} from "@/lib/review-average";
import Stars from "@/components/reviews/stars";
import {Progress} from "@/components/ui/progress";

function ReviewChart({ reviews}:{ reviews:ReviewsWithUser[]}) {


    //memoize the function to only change when the review change
    const getRatingByStars = useMemo(() => {
        const ratingValues = Array.from({length:5}, () => 0)
        const totalReviews = reviews.length

        reviews.forEach((review) => {
            const starIndex= review.rating  -1;
            if(starIndex >= 0 && starIndex < 5){
                ratingValues[starIndex]++
            }
        })

        return ratingValues.map((rating) => (rating / totalReviews) * 100 )
    }, [reviews])




    const totalRating = getReviewAverage(reviews.map((review) => review.rating))
    return (
        <Card  className="flex flex-col p-8 rounded-md gap-6">
            <div className="flex flex-col gap-2" >
                <CardTitle>
                    Product Rating :
                </CardTitle>

                {/*<Stars size={18} totalReviews={reviews.length} rating={totalRating}/>*/}

                <CardDescription className="text-lg font-medium">
                    {totalRating.toFixed(1)} stars
                </CardDescription>
            </div>

            {getRatingByStars.map((rating, index)=> (
                <div key={index} className="flex gap-2 justify-between items-center ">


                    <p className="text-xs font-medium flex gap-1">
                        {index +1 } <span>
                        stars
                    </span>


                    </p>
                    <Progress value={rating}/>
                </div>


                ))}

        </Card>
    );
}


export default ReviewChart;