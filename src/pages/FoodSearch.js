import { useState } from "react";
import styled from "styled-components";
import { Input } from "@geist-ui/core";
import { Search, ArrowLeft } from "react-feather";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchResultItem from "../components/SearchResultItem";
import IconButton from "../components/IconButton";
import { initialize } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const StyledFoodSearch = styled.div`
  margin: 32px;
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
`;

const { firebaseApp, firestore } = initialize();

export default function FoodSearch(props) {
  const foodAdded = props.foods.map((food) => food.food.id);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");
  const [foodData, setFoodData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    const foodsRef = collection(firestore, "foods");
    onSnapshot(foodsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const id = doc.id;
        return {
          id,
          ...doc.data(),
        };
      });
      setFoodData(data);
    });
  }, []);

  const renderResultItem = (food) => {
    if (state.from === "foods") {
      return (
        <SearchResultItem
          food={food}
          key={food.id}
          actionLabel="加入最愛"
          disabled={foodAdded.includes(food.id)}
          onClick={() => navigate("/foods/add", { state: { ...food } })}
        />
      );
    } else {
      return (
        <SearchResultItem
          food={food}
          key={food.id}
          actionLabel="加入紀錄"
          onClick={() => navigate("/foods/records/add", { state: { ...food } })}
        />
      );
    }
  };

  return (
    <StyledFoodSearch>
      <div className="search-bar">
        <Link to="/foods">
          <IconButton
            size="40"
            color="transparent"
            icon={<ArrowLeft color="var(--neutral-700)" />}
          ></IconButton>
        </Link>
        <Input
          icon={<Search />}
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          width="100%"
          autoFocus
          placeholder="搜尋食物名稱"
        ></Input>
      </div>

      <div className="results">
        {foodData
          .filter((food) => {
            if (searchParams === "") {
              return null;
            } else if (
              food.brand.toLowerCase().includes(searchParams.toLowerCase())
            ) {
              return food;
            }
            // return food;
          })
          .map(renderResultItem)}
      </div>
    </StyledFoodSearch>
  );
}
