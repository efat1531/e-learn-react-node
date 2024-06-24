import style from "./RatingProgressBar.module.css";
import StarRatingCard from "../Cards/StarRatingCard";
import PropTypes from "prop-types";
import React from "react";


const calculateProgressWidth = (value, parcentage) => {
  const maxWidth = 23.5;
  const width = parcentage;
  return (width / 100) * maxWidth;
};

const RatingProgressBar = ({ reviews, value }) => {
  const ratingQuantity = reviews.filter((review) => review.rating === value).length;
  const percentage = (ratingQuantity / reviews.length) * 100;

  return (
    <div className={style.ratingProgress}>
      <div className={style.starRating}>
        <StarRatingCard rating={value} size="1x" />
        <div className={style.textStarRating}>{value}&nbsp;Star Rating</div>
      </div>
      <div className={style.progressContainer}>
        <div className={style.progressBar}></div>
        <div
          className={style.progressBarMain}
          style={{ width: `${calculateProgressWidth(value, percentage)}rem` }}
        ></div>
        <div className={style.progressValue}>
          {percentage >= 1
            ? `${percentage.toFixed(0)}%`
            : "< 1%"}
        </div>
      </div>
    </div>
  );
};

RatingProgressBar.propTypes = {
  reviews: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
};

export default RatingProgressBar;
