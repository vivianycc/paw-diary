import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Input, Select, Textarea } from "@geist-ui/core";
import { initialize } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const { firebaseApp, firestore } = initialize();
const foodsCol = collection(firestore, "foods");

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 32px;

  div label {
    display: block;
    font-size: 14px;
    color: var(--neutral-700);
    margin-bottom: 8px;
  }
`;

// "id": 4240679908,
// "brand": "凱茲CATZ",
// 'product':"",
// "flavor": "雞肉",
// "weight": 85,
// "origin":"德國",
// "foodType":"主食",
// "ingredient": [],
// "water": "80.0%",
// "protein": "10.8%",
// "fat": "5.6%",
// "carbonhydrate": "1.2%",
// "ash": "2.0%",
// "fibre": "0.4%",
// "calcium": "0.03%",
// "phosphorus": "0.025%",
// "capRatio": "120%",
// "vitd3": 17,
// "taurine": 127.5,
// "zinc": 1.28,
// "manganese": 0.26,
// "iodine": 0.06,
// "vite": "",
// "nonMeatElement": "奇亞籽、月見草油"
// "createdBy":some user id

export default function CreateFoodPage(props) {
  const [foodInfo, setFoodInfo] = useState({
    brand: "",
    product: "",
    flavor: "",
    calories: "",
    foodType: "",
    ingredient: [],
    addedNutrition: "",
    origin: "",
  });

  const handleChange = (event) => {
    setFoodInfo({ ...foodInfo, [event.target.name]: event.target.value });
  };
  const handleFoodTypeSelect = (value) => {
    setFoodInfo({ ...foodInfo, foodType: value });
  };
  const handleIngredientSelect = (value) => {
    setFoodInfo({ ...foodInfo, ingredient: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // props.foodHandler([...props.food, foodInfo]);
    onSnapshot(foodsCol, (snapshot) => {
      console.log(snapshot.docs.map((d) => d.data()));
    });

    const foodToAdd = doc(foodsCol);
    setDoc(foodToAdd, foodInfo);
    setFoodInfo({
      brand: "",
      product: "",
      flavor: "",
      calories: "",
      foodType: "",
      ingredient: [],
      addedNutrition: "",
      origin: "",
    });
    // navigate("/foods");
  };

  const navigate = useNavigate();
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        placeholder="葛雷特"
        initialValue="葛雷特"
        name="brand"
        value={foodInfo.brand}
        onChange={handleChange}
        required
      >
        品牌名稱
      </Input>
      <Input
        placeholder="精緻時光"
        name="product"
        value={foodInfo.product}
        onChange={handleChange}
      >
        系列名稱
      </Input>
      <Input
        placeholder="3號鮭魚＆火雞"
        name="flavor"
        value={foodInfo.flavor}
        onChange={handleChange}
      >
        品項名稱
      </Input>
      <Input
        placeholder="191"
        name="calories"
        value={foodInfo.calories}
        onChange={handleChange}
      >
        卡路里(kcal/100g)
      </Input>
      <div>
        <label htmlFor="ingredient"> 種類</label>
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
      {/* {console.log("props", props)} */}
      <div>
        <label htmlFor="ingredient"> 主要原料</label>
        <Select
          multiple
          placeholder="雞肉"
          name="ingredient"
          value={foodInfo.ingredient}
          onChange={handleIngredientSelect}
        >
          <Select.Option value="chicken">雞肉</Select.Option>
          <Select.Option value="beef">牛肉</Select.Option>
          <Select.Option value="salmon">鮭魚</Select.Option>
        </Select>
      </div>

      <div>
        <label htmlFor="addedNutrition"> 營養添加物</label>
        <Textarea
          name="addedNutrition"
          placeholder="牛磺酸、硫酸鋅..."
          value={foodInfo.addedNutrition}
          onChange={handleChange}
        />
      </div>
      <Input placeholder="德國">原產地</Input>
      <div>
        <button>Submit Contact</button>
      </div>
    </StyledForm>
  );
}
