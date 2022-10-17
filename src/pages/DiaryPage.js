import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import { Calendar, Heart, Image, BookOpen, TrendingUp } from "react-feather";
import { Modal, Drawer } from "@geist-ui/core";
import CalendarView from "../components/Calendar";
import IconButton from "../components/IconButton";
import FoodIntakeItem from "../components/FoodIntakeItem";
import MenuItem from "../components/MenuItem";
import ActionButton from "../components/ActionButton";

const StyledPage = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;

    h1 {
      letter-spacing: 2px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
    overflow-y: scroll;
    padding-bottom: 128px;
  }
  h2 {
    font-size: 14px;
    font-weight: 500;
  }
  .note {
    padding: 24px 16px;
    background-color: #fff;
    border-radius: 24px;
  }
  .empty-message {
    color: var(--neutral-300);
    text-align: center;
    flex: 1;
  }
  .menu-items {
  }
`;

const StyledMenuItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function DiaryPage(props) {
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedDayData, setSelectedDayData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = props.entries.filter((entry) => {
      if (
        dayjs(entry.date).format("YYYY/MM/DD") ===
        selectedDay.format("YYYY/MM/DD")
      ) {
        return entry;
      }
    });
    if (filtered.length > 0) {
      setSelectedDayData(...filtered);
    } else {
      setSelectedDayData([]);
    }
  }, [props.entries, selectedDay]);

  const renderEmptyContent = () => {
    return <div className="empty-message">今天還沒有紀錄 </div>;
  };
  const renderContent = () => {
    const { note, foodIntake = [] } = selectedDayData;
    return (
      <>
        <div className="note">
          {console.log(selectedDayData)}
          {note}
        </div>
        <h2>食物紀錄</h2>
        {foodIntake.map((info) => (
          <FoodIntakeItem info={info} />
        ))}
      </>
    );
  };
  return (
    <StyledPage>
      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <CalendarView
          setSelectedDay={setSelectedDay}
          setShowModal={setShowModal}
        />
      </Modal>
      <div className="header">
        <h1>{`${selectedDay.locale("zh-tw").format("MMMD")}日`}</h1>
        <IconButton
          icon={<Calendar />}
          color="var(--neutral-200)"
          strokeColor="var(--neutral-700)"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="content">
        {Object.keys(selectedDayData).length === 0
          ? renderEmptyContent()
          : renderContent()}
      </div>
      <ActionButton onClick={() => setShowDrawer(true)} />
      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        placement="bottom"
      >
        <StyledMenuItem>
          <MenuItem
            icon={<Heart />}
            label="食物"
            onClick={() =>
              navigate("/foods/search", { state: { from: "diary" } })
            }
          />
          <MenuItem icon={<Image />} label="照片" />
          <MenuItem icon={<BookOpen />} label="日記" />
          <MenuItem icon={<TrendingUp />} label="數據" />
        </StyledMenuItem>
      </Drawer>
    </StyledPage>
  );
}
