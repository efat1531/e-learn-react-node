import style from "./CourseRating.module.css";
import StarRatingCard from "../../components/uitls/Cards/StarRatingCard";
import RatingProgressBar from "../../components/uitls/Label/RatingProgressBar";
import React from "react";
import reviewData from "../../../Data/reviewData.json";
import PropTypes from "prop-types";

const ratingCalc = (courseID) => {
  const reviews = reviewData.filter((review) => review.courseID === courseID);
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
}



const CourseRating = ({courseID}) => {
  const rating = Number(ratingCalc(courseID));
   const reviews = reviewData.filter((review) => review.courseID === courseID);

  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>Course Rating</div>
      <div className={style.ratingContainer}>
        <div className={style.ratingBox}>
          <div className={style.ratingText}>{rating}</div>
          <div className={style.ratingInfo}>
            <StarRatingCard rating={rating} size="lg" />
            <div className={style.textCourse}>Course Rating</div>
          </div>
        </div>
        <div className={style.ratingSummary}>
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <RatingProgressBar key={index} reviews={reviews} value={rating} />
          ))}
        </div>
      </div>
    </div>
  );
};

CourseRating.propTypes = {
  courseID: PropTypes.string.isRequired,
};

export default CourseRating;
