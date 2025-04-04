import { useState } from "react";

const starContainerStyles = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
};

const RatingStars = function ({
  maxRate = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating, // NOTE: DID NOT SPECIFY IN INDEX.JS
}) {
  const [ratingNumber, setRatingNumber] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleOnClick = function (rating) {
    setRatingNumber(rating);
    onSetRating(rating);
  };
  const handleOnMouseEnter = function (rating) {
    setTempRating(rating);
  };
  const handleOnMouseLeave = function (rating) {
    setTempRating(rating);
  };
  return (
    <div style={starContainerStyles} className={className}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: maxRate }, (_, i) => {
          return (
            <Star
              size={size}
              color={color}
              key={i}
              onClick={() => handleOnClick(i + 1)}
              onMouseEnter={() => handleOnMouseEnter(i + 1)}
              onMouseLeave={() => handleOnMouseLeave(0)}
              //NOTE:
              full={tempRating ? tempRating >= i + 1 : ratingNumber >= i + 1}
              // full={tempRating >= i + 1 || ratingNumber >= i + 1}
            />
          );
        })}
      </div>
      <RatingNumber color={color} size={size}>
        {messages.length === maxRate
          ? messages[tempRating ? tempRating - 1 : ratingNumber - 1]
          : tempRating || ratingNumber || ""}
      </RatingNumber>
    </div>
  );
};
const Star = function ({
  size,
  onClick,
  onMouseEnter,
  onMouseLeave,
  full,
  color,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};
const RatingNumber = function ({ children, size, color }) {
  const messageStyle = {
    fontSize: `${size - 10}px`,
    color: color,
    lineHeight: 1,
  };
  return <span style={messageStyle}>{children}</span>;
};
export default RatingStars;
