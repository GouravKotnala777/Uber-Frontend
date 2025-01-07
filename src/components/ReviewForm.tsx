import { BsStarFill } from "react-icons/bs";
import Heading from "./Heading";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { createReview } from "../api";
import { redirectAfterToast } from "../utils/utilityFunctions";
import Input from "./Input";
import Button from "./Button";
import "../styles/components/review_form.scss";
import { ReviewTypesPopulated } from "../utils/types";


const ReviewForm = ({driverID, rideID, setAllReviews, setNewReview, setHasAlreadyReviewed,
    rating ,setRating, comment, setComment
}:{driverID:string; rideID:string; setNewReview:Dispatch<SetStateAction<ReviewTypesPopulated|null>>; setAllReviews:Dispatch<SetStateAction<ReviewTypesPopulated[]>>; setHasAlreadyReviewed:Dispatch<SetStateAction<boolean>>;
    rating:number;
    setRating:Dispatch<SetStateAction<number>>;
    comment:string;
    setComment:Dispatch<SetStateAction<string>>;
}) => {    
    const adjustRatingHandler = (e:MouseEvent<SVGElement>) => {
        //const selectedStar = e.currentTarget.style.color = "gold";
        //const selectedStarByClassname = document.querySelector("BsStarFill");
        setRating(Number(e.currentTarget.id.split("-")[1]));
        for (let num = 5; num > 0; num--) {
            const selectedStar = document.getElementById(`BsStarFill-${num}`);
            if (!selectedStar) break;
            if (num > Number(e.currentTarget.id.split("-")[1])) {
                selectedStar.style.color = "#515151";
            }
            else{
                selectedStar.style.color = "gold";
            }
        }
    };

    const createReviewHandler = async() => {
        const reviewRes = await createReview({
            driverID, rideID, rating, comment
        });

        if (reviewRes.success) {
            if (reviewRes.message === "Review created") {
                setAllReviews((prev) => [...prev, reviewRes.jsonData]);
                setNewReview(reviewRes.jsonData);
                setHasAlreadyReviewed(true);
            }
            else if (reviewRes.message === "Review updated") {
                setAllReviews((prev) => [...prev.filter((revw) => revw._id !== reviewRes.jsonData._id), reviewRes.jsonData]);
                setNewReview(reviewRes.jsonData);
                setHasAlreadyReviewed(true);
            }
            else{
                throw new Error("Error occured from ReviewForm.tsx");
            }
        }

        redirectAfterToast({res:reviewRes});
    };

    return(
        <div className="rating_cont">
            <Heading text="Rate the driver" fontSize="1.1rem" />
            <div className="stars_cont">
                <BsStarFill id="BsStarFill-1" className="BsStarFill" onClick={(e) => adjustRatingHandler(e)} />
                <BsStarFill id="BsStarFill-2" className="BsStarFill" onClick={(e) => adjustRatingHandler(e)} />
                <BsStarFill id="BsStarFill-3" className="BsStarFill" onClick={(e) => adjustRatingHandler(e)} />
                <BsStarFill id="BsStarFill-4" className="BsStarFill" onClick={(e) => adjustRatingHandler(e)} />
                <BsStarFill id="BsStarFill-5" className="BsStarFill" onClick={(e) => adjustRatingHandler(e)} />
            </div>
            <Input placeholder="Comment... (optional)" margin="10px 0 0 0" onChangeHandler={(e) => setComment(e.target.value)} />
            <Button text="Give review to driver" margin="10px 0" onClickHandler={createReviewHandler} />
        </div>
    )
};

export default ReviewForm;