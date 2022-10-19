import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const StyledForm = styled.form``;

export default function AddFoodRecordPage({ diaries, addfoodRecordHandler }) {
  const [form, setForm] = useState({
    portion: 30,
    time: "08:30am",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { brand, product, flavor, calories, id } = location.state;

  const handleSubmit = () => {
    const newRecord = {
      foodBrand: brand,
      foodProduct: product,
      foodFlavor: flavor,
      foodId: id,
      calories: calories,
      portion: form.portion,
      time: form.time,
    };
    const newDiaries = [
      ...diaries,
      {
        date: dayjs().format("YYYY/MM/DD"),
        note: "",
        foodRecord: [newRecord],
        photos: [],
      },
    ];
    addfoodRecordHandler(newDiaries);
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="time"
          name="time"
          id=""
          onChange={handleChange}
          value={form.time}
        />
        <input
          type="number"
          name="portion"
          id=""
          onChange={handleChange}
          value={form.portion}
        />
        <button type="submit">送出</button>
      </StyledForm>
    </div>
  );
}
