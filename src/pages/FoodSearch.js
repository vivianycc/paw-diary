import { useState } from "react";
import styled from "styled-components";
import { Input } from "@geist-ui/core";
import { Search, ArrowLeft } from "react-feather";
import { useNavigate, Link } from "react-router-dom";
import SearchResultItem from "../components/SearchResultItem";
import IconButton from "../components/IconButton";
import FOODDATA from "../data.json";

const StyledFoodSearch = styled.div`
  margin: 32px;

  .search-bar {
    display: flex;
  }
`;

export default function FoodSearch(props) {
  const foodAdded = props.foods.map((food) => food.food.id);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");

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
        {FOODDATA.filter((food) => {
          if (searchParams === "") {
            return null;
          } else if (
            food.brand.toLowerCase().includes(searchParams.toLowerCase())
          ) {
            return food;
          }
          return food;
        }).map((food) => {
          if (foodAdded.includes(food.id)) {
            return <SearchResultItem {...food} key={food.id} disabled={true} />;
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
