import { useState } from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import { Drawer, Input, Modal, Tabs, Button } from "@geist-ui/core";
import FoodItem from "../components/FoodItem";
import ActionButton from "../components/ActionButton";

const StyledFoodPage = styled.div`
  height: 100%;
  padding-top: 32px;
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

export default function FoodPage(props) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const closeHandler = (event) => {
    setShowModal(false);
    setSelectedFood(null);
  };
  return (
    <StyledFoodPage>
      <h1>食物目錄</h1>
      <Tabs initialValue="1" hideDivider className="food-tabs">
        <Tabs.Item label="全部" value="1">
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
        </Tabs.Item>
        <Tabs.Item label="主食" value="2">
          目前沒有項目
        </Tabs.Item>
        <Tabs.Item label="副食" value="3">
          目前沒有項目
        </Tabs.Item>
        <Tabs.Item label="零食" value="4">
          目前沒有項目
        </Tabs.Item>
        <Tabs.Item label="保健品" value="5">
          目前沒有項目
        </Tabs.Item>
      </Tabs>

      {selectedFood && (
        <Modal visible={showModal} onClose={closeHandler}>
          <Modal.Subtitle>{selectedFood.food.brand}</Modal.Subtitle>
          <Modal.Title>{selectedFood.food.flavor}</Modal.Title>
          <Modal.Content>
            <p>Some content contained within the modal.</p>
          </Modal.Content>
        </Modal>
      )}

      <ActionButton onClick={() => setShowDrawer(true)} />
      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        placement="bottom"
      >
        <Link to="./search">
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
