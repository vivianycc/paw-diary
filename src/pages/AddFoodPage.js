import { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "@geist-ui/core";
import { getFirebase } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import FoodNutrition from "../components/FoodNutrition";

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 32px;
  background-color: var(--neutral-100);
  overflow-y: scroll;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    width: 100%;

    .textarea {
      width: 100%;
      height: 100px;
    }

    .button-group {
      width: 100%;
    }
  }
`;
export default function AddFoodPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { brand, id, currentPet } = state;
  const [rating, setRating] = useState(0);
  const [, setRatingLocked] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const { firestore } = getFirebase();

  const foodDoc = doc(
    firestore,
    "users",
    user.uid,
    "pets",
    currentPet,
    "foods",
    id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFood = {
      food: { ...state },
      rating: rating,
      comment: comment,
    };
    setDoc(foodDoc, newFood, { merge: true });

    navigate("/foods");
  };
  return (
    <StyledPage>
      <form onSubmit={handleSubmit}>
        <p>{brand}</p>
        <FoodNutrition {...state} />
        <Rating
          onLockedChange={setRatingLocked}
          value={rating}
          onValueChange={setRating}
        />
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button.Group>
          <Button
            label="取消"
            variant="secondary"
            onClick={() => navigate("/foods")}
          />
          <Button label="加入" type="submit" />
        </Button.Group>
      </form>
    </StyledPage>
  );
}
