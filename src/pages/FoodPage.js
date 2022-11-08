import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useOutletContext } from "react-router-dom";
import { Drawer, Input, Modal, Tabs, Button } from "@geist-ui/core";
import { Search } from "react-feather";
import { getFirebase } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import Nav from "../components/Nav";
import FoodItem from "../components/FoodItem";
import ActionButton from "../components/ActionButton";
import FoodNutrition from "../components/FoodNutrition";

const StyledFoodPage = styled.div`
  height: 100%;
  padding-top: 24px;
  .items {
    height: 100%;
    padding-bottom: 128px;
    overflow: scroll;
  }
  .tabs.food-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .content {
    flex: 1;
    overflow: scroll;
    padding-bottom: 104px;
  }
`;

export default function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const currentPet = useOutletContext();
  const { user } = useAuth();
  const { firestore } = getFirebase();

  const filteredFood = (foodType) => {
    return foods.filter((food) => food.food.foodType === foodType);
  };

  const closeHandler = (event) => {
    setShowModal(false);
    setSelectedFood(null);
  };

  useEffect(() => {
    const foodCol = collection(
      firestore,
      "users",
      user.uid,
      "pets",
      currentPet,
      "foods"
    );
    const unsubscribe = onSnapshot(foodCol, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setFoods(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderFoodItem = (foodData) => {
    return foodData.map((item) => (
      <FoodItem
        key={item.id}
        {...item}
        onClick={() => {
          setSelectedFood(item);
          setShowModal(true);
        }}
      />
    ));
  };

  return (
    <StyledFoodPage>
      <h1>食物目錄</h1>
      <Tabs initialValue="1" hideDivider className="food-tabs">
        <Tabs.Item label="全部" value="1">
          <div className="items">
            {foods.map((food) => (
              <FoodItem
                key={food.id}
                {...food}
                onClick={() => {
                  setSelectedFood(food);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item label="主食" value="2">
          {renderFoodItem(filteredFood("complete"))}
        </Tabs.Item>
        <Tabs.Item label="副食" value="3">
          {renderFoodItem(filteredFood("complementary"))}
        </Tabs.Item>
        <Tabs.Item label="零食" value="4">
          {renderFoodItem(filteredFood("treat"))}
        </Tabs.Item>
        <Tabs.Item label="保健品" value="5">
          {renderFoodItem(filteredFood("supplement"))}
        </Tabs.Item>
      </Tabs>

      {selectedFood && (
        <Modal visible={showModal} onClose={closeHandler}>
          {console.log(selectedFood)}
          <Modal.Subtitle>{selectedFood.food.brand}</Modal.Subtitle>
          <Modal.Title>{selectedFood.food.flavor}</Modal.Title>
          <Modal.Content>
            <FoodNutrition {...selectedFood.food} />
          </Modal.Content>
        </Modal>
      )}

      <ActionButton onClick={() => setShowDrawer(true)} />
      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        placement="bottom"
      >
        <Link to="./search" state={{ from: "foods", currentPet: currentPet }}>
          <Input icon={<Search />} placeholder="搜尋食物名稱" />
        </Link>
        <Link to="./create">
          <Button>創建食物</Button>
        </Link>
      </Drawer>
      <Nav />
    </StyledFoodPage>
  );
}
