import style from "./StudentsRating.module.css";
import { useState, React } from "react";
import CustomSelect from "../../components/uitls/Input/CustomSelect";
import StudentFeedbackCard from "../../components/uitls/Cards/StudentFeedbackCard";
import Divider from "../../components/uitls/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import reviewData from "../../../Data/reviewData.json"
import PropTypes from "prop-types";



const options = [
  {
    value: "1",
    label: "1 Star Rating",
    hoverColor: "#FF0000", // Red for 1 star
    textColor: "#FFFFFF", // White text
  },
  {
    value: "2",
    label: "2 Star Rating",
    hoverColor: "#FF7F00", // Orange for 2 stars
    textColor: "#FFFFFF", // White text
  },
  {
    value: "3",
    label: "3 Star Rating",
    hoverColor: "#FFFF00", // Yellow for 3 stars
    textColor: "#000000", // Black text
  },
  {
    value: "4",
    label: "4 Star Rating",
    hoverColor: "#00FF00", // Green for 4 stars
    textColor: "#000000", // Black text
  },
  {
    value: "5",
    label: "5 Star Rating",
    hoverColor: "#0000FF", // Blue for 5 stars
    textColor: "#FFFFFF", // White text
  },
];

const StudentsRating = ({courseID}) => {

  const reviews = reviewData.filter((review) => review.courseID === courseID);
  const [selectedOption, setSelectedOption] = useState(options[4]);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const filteredAndSortedRatings = reviews
    .filter((rating) => rating.rating <= parseInt(selectedOption.value))
    .sort((a, b) => b.rating - a.rating);

  const length = filteredAndSortedRatings.length;

  const handleLoadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setVisibleReviews(2);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>
        <div className={style.title}>Student&apos;s Feedback</div>
        {reviews.length > 0 && (
          <div className={style.filter}>
            <CustomSelect
              options={options}
              setSelectedOption={handleOptionChange}
              selectedOption={selectedOption}
              customPlaceholder="Filter by Rating"
            />
          </div>
        )}
      </div>
      {filteredAndSortedRatings
        .slice(0, visibleReviews)
        .map((rating, index) => (
          <div key={index} className={style.feedbackContainer}>
            <StudentFeedbackCard feedback={rating} />
            <Divider width="100%" />
          </div>
        ))}
      {visibleReviews < length && (
        <button className={style.loadMoreButton} onClick={handleLoadMore}>
          <div className={style.loadMoreText}>Load More</div>
          <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#FF6636" }} />
        </button>
      )}
    </div>
  );
};

StudentsRating.propTypes = {
  courseID: PropTypes.string.isRequired,
};

export default StudentsRating;
