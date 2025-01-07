import { useEffect, useState } from "react";
import "../styles/components/review_form.scss";
import { findDriverAllReviews } from "../api";
import { ReviewTypesPopulated } from "../utils/types";
import { showStarsForRating } from "../utils/utilityFunctions";
import ReviewForm from "./ReviewForm";
import Button from "./Button";
import ImgWithFallback from "./ImgWithFallback";


const AllReviews = ({driverID, rideID}:{driverID:string; rideID:string;}) => {
    const [allReviews, setAllReviews] = useState<ReviewTypesPopulated[]>([]);
    const [newReview, setNewReview] = useState<ReviewTypesPopulated|null>(null);
    const [rating, setRating] = useState<number>(3);
    const [comment, setComment] = useState<string>("");
    const [hasAlreadyReviewed, setHasAlreadyReviewed] = useState<boolean>(false);

    useEffect(() => {
        findDriverAllReviews({
            driverID, rideID
        }).then((data) => {
            setAllReviews(data.jsonData.driverAllReviews);
            setNewReview(data.jsonData.isReviewExist);
            if (data.jsonData.isReviewExist) {
                setHasAlreadyReviewed(true);
            }
        }).catch((err) => {
            console.log(err);
        });

    }, []);
    
    return(
        <>
            <div className="all_reviews_cont">
                {
                    hasAlreadyReviewed ?
                        (newReview &&
                            <div className="review_cont">
                                <div className="img_cont">
                                    <ImgWithFallback src={newReview.passengerID.image} fallbackSrc="unknown_user.png" />
                                </div>
                                <div className="rating">
                                    {showStarsForRating(newReview.rating).map((StarIcon) => (<StarIcon className="BsStarFill" />))}
                                    {/*<BsStarFill className="BsStarFill" />*/}
                                </div>
                                <div className="comment">{newReview.comment}</div>
                                <Button text="Update review" color="black" background="transparent" margin="10px 0" border onClickHandler={() => setHasAlreadyReviewed(false)} />
                            </div>)
                        :
                        <ReviewForm driverID={driverID} rideID={rideID} setAllReviews={setAllReviews} setNewReview={setNewReview} setHasAlreadyReviewed={setHasAlreadyReviewed}
                            rating={rating}
                            setRating={setRating}
                            comment={comment}
                            setComment={setComment}
                        />
                }
                {/*<pre>{JSON.stringify({allReviews}, null, `\t`)}</pre>*/}
                {/*<pre>{JSON.stringify({newReview}, null, `\t`)}</pre>*/}
                {/*<pre>{JSON.stringify({hasAlreadyReviewed}, null, `\t`)}</pre>*/}
                {
                    allReviews.map((revw) => (
                        <div className="review_cont">
                            <div className="img_cont">
                            <ImgWithFallback src={revw.passengerID.image} fallbackSrc="unknown_user.png" />
                            </div>
                            <div className="rating">
                                {showStarsForRating(revw.rating).map((StarIcon) => (<StarIcon className="BsStarFill" />))}
                                {/*<BsStarFill className="BsStarFill" />*/}
                            </div>
                            <div className="comment">{revw.comment}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

export default AllReviews;