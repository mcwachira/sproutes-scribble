
export const getReviewAverage = (reviews:number[]) => {
    if(reviews.length === 0) return 0
    return reviews.reduce((prev, acc) => acc+ prev, 0)/reviews.length;

}