import { useState } from "react";
import star from "../../assets/star.svg";

function RatingStar() {
  const [userRating, setUserRating] = useState<number>(0);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div className="flex gap-[5px]">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <img
          key={starIndex}
          src={star}
          alt={`${starIndex} star`}
          className={`h-8 w-8 cursor-pointer ${
            starIndex <= userRating ? "grayscale-0" : "grayscale"
          }`}
          onClick={() => handleRating(starIndex)}
        />
      ))}
    </div>
  );
}

export default RatingStar;
