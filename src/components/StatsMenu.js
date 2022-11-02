import { useState, useEffect } from "react";
import styled from "styled-components";
import { Drawer, Select } from "@geist-ui/core";
import dayjs from "dayjs";
import { getFirebase } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import Input from "./Input";
const StyledDrawer = styled(Drawer)`
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .value-input {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    font-size: 14px;
    > div {
      flex: 1;
    }
  }
  input {
    border-radius: 24px;
    width: 100%;
  }
  .button {
    margin-bottom: 32px;
  }
`;

export default function StatsMenu({ showDrawer, setShowDrawer, currentPet }) {
  const [statsType, setStatsType] = useState("weight");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs().format("HH:mm"));
  const { firestore } = getFirebase();
  const { user } = useAuth();

  useEffect(() => {
    setValue(0);
  }, [statsType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date: date,
      [statsType]: +value,
    };

    const docRef = doc(
      firestore,
      "users",
      user.uid,
      "pets",
      currentPet,
      "stats",
      date
    );
    setDoc(docRef, data, { merge: true });
  };
  return (
    <StyledDrawer
      visible={showDrawer}
      onClose={() => setShowDrawer(false)}
      placement="bottom"
    >
      <form onSubmit={handleSubmit}>
        <Select
          placeholder="Choose one"
          onChange={(val) => setStatsType(val)}
          value={statsType}
        >
          <Select.Option value="weight">體重</Select.Option>
          <Select.Option value="breathRate">呼吸次數</Select.Option>
          <Select.Option value="heartRate">心率</Select.Option>
        </Select>
        <Input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        {statsType !== "weight" && (
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        )}
        <div className="value-input">
          <Input
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {statsType !== "weight" ? <span>次/每分鐘</span> : <span>公斤</span>}
        </div>
        <Button type="submit" label="儲存" />
      </form>
    </StyledDrawer>
  );
}
