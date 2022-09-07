import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Textarea, Rating } from "@geist-ui/core";

export default function AddFoodPage(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { brand } = state;
  const [rating, setRating] = useState(0);
  const [, setRatingLocked] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const newFood = {
      food: { ...state },
      id: Math.floor(Math.random() * 10000000),
      rating: rating,
      comment: comment,
    };
    props.addFoodHandler([...props.foods, newFood]);
    navigate("/foods");
    console.log("hi");
  };
  return (
    <div>
      <p>{brand}</p>

      <form onSubmit={handleSubmit}>
        <Rating
          onLockedChange={setRatingLocked}
          value={rating}
          onValueChange={setRating}
        />
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>加入</button>
      </form>
    </div>
  );
}
