import { useState } from "react";
import styled from "styled-components";
import { Input } from "@geist-ui/core";
import { Search, ArrowLeft } from "react-feather";
import { useNavigate, Link } from "react-router-dom";
import SearchResultItem from "../components/SearchResultItem";
import IconButton from "../components/IconButton";
import FOODDATA from "../data.json";
import { initialize } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const StyledFoodSearch = styled.div`
  margin: 32px;

  .search-bar {
    display: flex;
  }
`;

const { firebaseApp, firestore } = initialize();

export default function FoodSearch(props) {
  const foodAdded = props.foods.map((food) => food.food.id);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");
  const [foodData, setFoodData] = useState([]);

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

  return (
    <StyledFoodSearch>
      <div className="search-bar">
        <Link to="/foods">
          <IconButton size="40" color="transparent">
            <ArrowLeft color="var(--neutral-700)" />
          </IconButton>
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
          .map((food) => {
            if (foodAdded.includes(food.id)) {
              return (
                <SearchResultItem {...food} key={food.id} disabled={true} />
              );
            } else {
              return (
                <SearchResultItem
                  {...food}
                  key={food.id}
                  onClick={() => navigate("/foods/add", { state: { ...food } })}
                />
              );
            }
          })}
      </div>
    </StyledFoodSearch>
  );
}
