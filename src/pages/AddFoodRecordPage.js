import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getFirebase } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";
import FoodRecordItem from "../components/FoodRecordItem";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
  padding: 32px;
  background-color: var(--neutral-100);

  h1 {
    font-size: 24px;
    color: var(--neutral-700);
    text-align: left;
    margin-bottom: 32px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    input {
      width: 100%;
    }
    .portion-input {
      display: flex;
      align-items: center;
      gap: 16px;
      .input {
        flex: 1;
      }
    }
  }
`;

export default function AddFoodRecordPage() {
  const [form, setForm] = useState({
    portion: 30,
    time: dayjs().format("HH:mm"),
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { brand, product, flavor, calories, id, currentPet, date } =
    location.state;
  const { firestore } = getFirebase();
  const { user } = useAuth();

  const docRef = doc(
    firestore,
    "users",
    user.uid,
    "pets",
    currentPet,
    "diaries",
    date
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiary = {
      foodRecord: [
        {
          foodBrand: brand,
          foodProduct: product,
          foodFlavor: flavor,
          foodId: id,
          calories: calories,
          portion: form.portion,
          time: form.time,
        },
      ],
    };

    setDoc(docRef, newDiary, { merge: true }).then(() => {
      navigate("/");
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <StyledPage>
      <h1>加入以下紀錄</h1>
      <form onSubmit={handleSubmit}>
        <FoodRecordItem
          info={{
            foodBrand: brand,
            foodProduct: product,
            foodFlavor: flavor,
            foodId: id,
            calories: calories,
            portion: form.portion,
            time: form.time,
          }}
        />
        <Input
          type="time"
          name="time"
          onChange={handleChange}
          value={form.time}
        />
        <div className="portion-input">
          <Input
            type="number"
            name="portion"
            onChange={handleChange}
            value={form.portion}
          />
          <p>公克</p>
        </div>

        <Button type="submit" label="送出" />
      </form>
    </StyledPage>
  );
}
