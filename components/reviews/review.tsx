"use client"
import React from 'react';
import {reviewSchema} from "@/types/review-schema";
import {motion} from 'framer-motion'
import {ReviewsWithUser} from "@/lib/infer-types";
import {Card} from "@/components/ui/card";
import Image from 'next/image'
import {formatDistance, subDays} from "date-fns";
import Stars from "@/components/reviews/stars";

function Review({ reviews}:{ reviews:ReviewsWithUser[]}) {
    console.log(reviews[0]?.user.image)
    return (
     <motion.div className=" flex  flex-col gap-4">
         {
             reviews.map((review) => (


                 <Card key={review.id} className="p-4">
                     <div className="flex gap-2 iten-center">
                         {review.user?.image && <Image className="rounded-full"  width={32} height={32}  src={review.user?.image!}  alt={review.user.name!}/>}

                         <div>
                             <p>

                                 {review.user.name}
                             </p>

                             <div>
                              <Stars ratings={review.rating}/>


                             <p className="text-xs text-bold text-muted-foreground">
                                 {formatDistance(subDays(review.created!, 0), new Date())}
                             </p>
                             </div>
                         </div>
                     </div>

                     <p className="text-sm font-medium">
                         {review.comment}
                     </p>
                 </Card>
             ))
         }

     </motion.div>

    );
}

export default Review;