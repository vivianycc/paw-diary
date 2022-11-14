import { useState } from "react";
import styled from "styled-components";
import { Input } from "@geist-ui/core";
import { Search, ArrowLeft } from "react-feather";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchResultItem from "../components/SearchResultItem";
import IconButton from "../components/IconButton";
import { getFirebase } from "../firebase";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const StyledFoodSearch = styled.div`
  width: 100%;
  height: 100vh;
  padding: 32px;
  background-color: var(--neutral-100);

  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .input-wrapper {
      background-color: #fff;
    }
  }
`;

const { firestore } = getFirebase();

export default function FoodSearch(props) {
  // const foodAdded = props.foods.map((food) => food.food.id);
  const [searchParams, setSearchParams] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [foodAdded, setFoodAdded] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    state: { currentPet, date, from },
  } = useLocation();

  useEffect(() => {
    const foodsRef = collection(firestore, "foods");
    const unsubscribe = onSnapshot(foodsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const id = doc.id;
        return {
          id,
          ...doc.data(),
        };
      });
      setFoodData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const getAddedFood = async () => {
        const foodAddedRef = collection(
          firestore,
          "users",
          user.uid,
          "pets",
          currentPet,
          "foods"
        );
        const data = await getDocs(foodAddedRef);
        const foodIds = data.docs.map((doc) => doc.data().food.id);
        setFoodAdded(foodIds);
      };
      getAddedFood();
    }
  }, [user]);

  const renderResultItem = (food) => {
    if (from === "foods") {
      return (
        <SearchResultItem
          food={food}
          key={food.id}
          actionLabel="加入最愛"
          disabled={foodAdded.includes(food.id)}
          onClick={() => {
            console.log(food, currentPet);
            navigate("/foods/add", {
              state: { ...food, currentPet: currentPet },
            });
          }}
        />
      );
    } else {
      return (
        <SearchResultItem
          food={food}
          key={food.id}
          actionLabel="加入紀錄"
          onClick={() =>
            navigate("/foods/records/add", {
              state: {
                ...food,
                currentPet: currentPet,
                date: date,
              },
            })
          }
        />
      );
    }
  };

  if (user == null) {
    return <div>Loading...</div>;
  }

  return (
    <StyledFoodSearch>
      <div className="search-bar">
        <Link to="/foods">
          {console.log("added", foodAdded)}
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
