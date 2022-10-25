import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Select } from "@geist-ui/core";
import Input from "../components/FoodInput";
import { getFirebase } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const { firestore } = getFirebase();
const foodsCol = collection(firestore, "foods");

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 32px;

  label[for="ingredient"],
  label[for="foodType"] {
    font-size: 14px;
    color: var(--neutral-700);
  }
  .foodtype-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .foodtype-select div[name="foodType"].select {
    width: 72px;
    min-width: auto;
    border: none;
    text-align: right;
  }
  .ingredient {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }
  textarea {
    flex: 1;
    border: none;
    border-bottom: 1px solid var(--neutral-200);
    text-align: end;
  }
  textarea:focus {
    outline: none;
    border-bottom: 1px solid var(--neutral-500);
  }
  textarea::placeholder {
    color: var(--neutral-300);
  }
`;

export default function CreateFoodPage(props) {
  const [foodInfo, setFoodInfo] = useState({
    brand: "",
    product: "",
    flavor: "",
    calories: "",
    foodType: "",
    ingredient: "",
    origin: "",
    weight: "",
    //▼ %
    water: "",
    protein: "",
    fat: "",
    carbonhydrate: "",
    ash: "",
    fibre: "",
    calcium: "",
    phosphorus: "",
    //▼ IE
    vitd3: "",
    //▼ mg
    taurine: "",
    zinc: "",
    manganese: "",
    iodine: "",
    vite: "",
    nonMeatElement: [],
  });

  const handleChange = (event) => {
    setFoodInfo({ ...foodInfo, [event.target.name]: event.target.value });
  };
  const handleFoodTypeSelect = (value) => {
    setFoodInfo({ ...foodInfo, foodType: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      brand,
      product,
      flavor,
      calories,
      foodType,
      ingredient,
      origin,
      weight,
      water,
      protein,
      fat,
      carbonhydrate,
      ash,
      fibre,
      calcium,
      phosphorus,
      vitd3,
      taurine,
      zinc,
      manganese,
      iodine,
      vite,
    } = foodInfo;
    const newFoodInfo = {
      brand,
      product,
      flavor,
      calories: Number(calories),
      foodType,
      ingredient: ingredient.split(","),
      origin,
      weight: Number(weight),
      //▼ %
      water: Number(water),
      protein: Number(protein),
      fat: Number(fat),
      carbonhydrate: Number(carbonhydrate),
      ash: Number(ash),
      fibre: Number(fibre),
      calcium: Number(calcium),
      phosphorus: Number(phosphorus),
      //▼ mg
      vitd3: Number(vitd3),
      taurine: Number(taurine),
      zinc: Number(zinc),
      manganese: Number(manganese),
      iodine: Number(iodine),
      vite: Number(vite),
      nonMeatElement: [],
    };
    const foodToAdd = doc(foodsCol);
    setDoc(foodToAdd, newFoodInfo);

    setFoodInfo({
      brand: "",
      product: "",
      flavor: "",
      calories: "",
      foodType: "",
      ingredient: [],
      addedNutrition: "",
      origin: "",
      weight: "",
      //▼ %
      water: "",
      protein: "",
      fat: "",
      carbonhydrate: "",
      ash: "",
      fibre: "",
      calcium: "",
      phosphorus: "",
      //▼ mg
      vitd3: "",
      taurine: "",
      zinc: "",
      manganese: "",
      iodine: "",
      vite: "",
      nonMeatElement: [],
    });
    // navigate("/foods");
  };

  const navigate = useNavigate();
  return (
    <StyledForm onSubmit={handleSubmit} className="food-form">
      <Input
        label="品牌名稱"
        placeholder="葛雷特"
        name="brand"
        value={foodInfo.brand}
        onChange={handleChange}
        required
      />

      <Input
        label="系列名稱"
        placeholder="精緻時光"
        name="product"
        value={foodInfo.product}
        onChange={handleChange}
      />

      <Input
        label="品項名稱"
        placeholder="3號鮭魚＆火雞"
        name="flavor"
        value={foodInfo.flavor}
        onChange={handleChange}
      />

      <Input
        label="原產地"
        placeholder="德國"
        value={foodInfo.origin}
        onChange={handleChange}
      />

      <div className="foodtype-select">
        <label htmlFor="foodType"> 種類</label>
        <Select
          placeholder="主食"
          name="foodType"
          value={foodInfo.foodType}
          onChange={handleFoodTypeSelect}
        >
          <Select.Option value="main">主食</Select.Option>
          <Select.Option value="treat">零食</Select.Option>
          <Select.Option value="supplement">營養品</Select.Option>
        </Select>
      </div>

      <Input
        label="卡路里(kcal/100g)"
        placeholder="191"
        name="calories"
        value={foodInfo.calories}
        onChange={handleChange}
      />

      {/* {console.log("props", props)} */}
      <div className="ingredient">
        <label htmlFor="ingredient"> 主要原料</label>
        <textarea
          name="ingredient"
          value={foodInfo.ingredient}
          placeholder="雞肉,雞心...（請用逗點分開）"
          onChange={handleChange}
        />
      </div>

      <Input
        label="水份(%)"
        name="water"
        value={foodInfo.water}
        onChange={handleChange}
        placeholder="80.0"
      />

      <Input
        label="蛋白質(%)"
        name="protein"
        value={foodInfo.protein}
        onChange={handleChange}
        placeholder="10.8"
      />

      <Input
        label="脂肪(%)"
        name="fat"
        value={foodInfo.fat}
        onChange={handleChange}
        placeholder="5.6"
      />

      <Input
        label="碳水化合物(%)"
        name="carbonhydrate"
        value={foodInfo.carbonhydrate}
        onChange={handleChange}
        placeholder="1.2"
      />
      <Input
        label="灰質(%)"
        name="ash"
        value={foodInfo.ash}
        onChange={handleChange}
        placeholder="2.0"
      />

      <Input
        label="纖維(%)"
        name="fibre"
        value={foodInfo.fibre}
        onChange={handleChange}
        placeholder="0.4"
      />
      <Input
        label="鈣(%)"
        name="calcium"
        value={foodInfo.calcium}
        onChange={handleChange}
        placeholder="0.03"
      />
      <Input
        label="磷(%)"
        name="phosphorus"
        value={foodInfo.phosphorus}
        onChange={handleChange}
        placeholder="0.03"
      />
      <Input
        label="維他命 D3 (IE)"
        name="vitd3"
        value={foodInfo.vitd3}
        onChange={handleChange}
        placeholder="17"
      />
      <Input
        label="維他命 E (mg)"
        name="vite"
        value={foodInfo.vite}
        onChange={handleChange}
        placeholder="0"
      />
      <Input
        label="牛磺酸(mg)"
        name="taurine"
        value={foodInfo.taurine}
        onChange={handleChange}
        placeholder="127.5"
      />

      <Input
        label="鋅(mg)"
        name="zinc"
        value={foodInfo.zinc}
        onChange={handleChange}
        placeholder="127.5"
      />

      <Input
        label="錳(mg)"
        name="manganese"
        value={foodInfo.manganese}
        onChange={handleChange}
        placeholder="0.26"
      />

      <Input
        label="碘(mg)"
        name="iodine"
        value={foodInfo.iodine}
        onChange={handleChange}
        placeholder="0.06"
      />
      <div>
        <button>送出</button>
      </div>
    </StyledForm>
  );
}
