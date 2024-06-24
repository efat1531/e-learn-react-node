import style from "./TeacherInfoCard.module.css";

import { useState, React } from "react";
import PropTypes from "prop-types";
import reviewData from "../../../../Data/reviewData.json";
import courseData from "../../../../Data/courseData.json"

import IconTextLabel from "../../uitls/Label/IconTextLabel";

const getTotalRating = (instructorID) => {
  const courses = courseData.filter((course) => course.instructor === instructorID);
  const courseIDs = courses.map((course) => course.id);
  const reviews = reviewData.filter((review) => courseIDs.includes(review.courseID));
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
}

const totalStudents = (instructorID) => {
  const courses = courseData.filter((course) => course.instructor === instructorID);
  const totalStudents = courses.reduce((acc, course) => acc + course.students, 0);
  return totalStudents;
}

const totalCourse = (instructorID) => {
  const courses = courseData.filter((course) => course.instructor === instructorID);
  return courses.length;
}

const TeacherInfoCard = ({ instructorInfo }) => {
  const { name, profileImg, designation, bio } = instructorInfo;
  console.log(instructorInfo)
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={style.mainContainer}>
      <div
        className={style.instructorPhoto}
        style={{
          background: `url(${profileImg}) lightgray 50% / cover no-repeat`,
        }}
      ></div>
      <div className={style.info}>
        <div className={style.teacherInfo}>
          <div className={style.name}>{name}</div>
          <div className={style.designation}>{designation}</div>
        </div>
        <div className={style.funFact}>
          <IconTextLabel
            iconStyle={{
              name: "Star",
              width: "1.25rem",
              height: "1.25rem",
              fill: "#FD8E1F",
            }}
            text={`${getTotalRating(instructorInfo.userID)} Rating`}
            textStyle={{
              color: "#4E5566",
              fontFamily: "Inter",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.375rem",
              letterSpacing: "-0.00875rem",
            }}
          />
          <IconTextLabel
            iconStyle={{
              name: "Students",
              width: "1.25rem",
              height: "1.25rem",
              stroke: "#564FFD",
            }}
            text={`${totalStudents(instructorInfo.userID)} Students`}
            textStyle={{
              color: "#4E5566",
              fontFamily: "Inter",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.375rem",
              letterSpacing: "-0.00875rem",
            }}
          />
          <IconTextLabel
            iconStyle={{
              name: "PlayerIcon",
              width: "1.25rem",
              height: "1.25rem",
              fill: "#564FFD",
            }}
            text={`${totalCourse(instructorInfo.userID)} Courses`}
            textStyle={{
              color: "#4E5566",
              fontFamily: "Inter",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.375rem",
              letterSpacing: "-0.00875rem",
            }}
          />
        </div>
        <div className={style.bio}>
          <div
            className={isExpanded ? style.expandedText : style.collapsedText}
          >
            {bio}
          </div>
          {bio.length > 280 && (
            <div className={style.buttonContainer}>
              {isExpanded ? (
                <button onClick={toggleExpanded} className={style.buttonStyle}>
                  Read Less
                </button>
              ) : (
                <button onClick={toggleExpanded} className={style.buttonStyle}>
                  Read More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TeacherInfoCard.propTypes = {
  instructorInfo: PropTypes.object.isRequired,
};

export default TeacherInfoCard;
