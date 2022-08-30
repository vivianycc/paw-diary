import { useState } from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import IconButton from "../components/IconButton";
import { Plus, Search } from "react-feather";
import { Link } from "react-router-dom";
import { Drawer, Input, Modal } from "@geist-ui/core";
import FoodItem from "../components/FoodItem";

const StyledFoodPage = styled.div`
  height: 100vh;
  padding: 32px;
  background-color: var(--neutral-100);

  .items {
    height: 100%;
    padding-bottom: 128px;
    overflow: scroll;
  }
`;
const StyledIconButton = styled(IconButton)`
  position: fixed;
  bottom: 128px;
  right: 32px;
`;

export default function FoodPage(props) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const closeHandler = (event) => {
    setShowModal(false);
    setSelectedFood(null);
    console.log("closed");
  };
  return (
    <StyledFoodPage>
      <h1>Food</h1>
      <div className="items">
        {props.foods.map((food) => (
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
      {selectedFood && (
        <Modal visible={showModal} onClose={closeHandler}>
          <Modal.Subtitle>{selectedFood.food.brand}</Modal.Subtitle>
          <Modal.Title>{selectedFood.food.flavor}</Modal.Title>
          <Modal.Content>
            <p>Some content contained within the modal.</p>
          </Modal.Content>
        </Modal>
      )}

      <StyledIconButton size={56} onClick={() => setShowDrawer(true)}>
        <Plus />
      </StyledIconButton>
      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        placement="bottom"
      >
        <Link to="./search">
          <Input icon={<Search />} placeholder="搜尋食物名稱" />
        </Link>
      </Drawer>

      <Nav />
    </StyledFoodPage>
  );
}
