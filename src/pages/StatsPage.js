import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tabs } from "@geist-ui/core";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { useOutletContext } from "react-router-dom";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { getFirebase } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import StatsMenu from "../components/StatsMenu";
import ActionButton from "../components/ActionButton";
import StatsLineChart from "../components/StatsLineChart";
import StatsItem from "../components/StatsItem";
import SegmentedControl from "../components/SegmentedControl";

const StyledStatsPage = styled.div`
  flex: 1;
  min-height: 0;
  .tabs {
    height: 100% !important;
  }

  .tabs .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
    padding-bottom: 128px;
  }
`;

export default function StatsPage() {
  const [displayStats, setDisplayStats] = useState([]);
  const [stats, setStats] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const currentPet = useOutletContext();
  const { firestore } = getFirebase();
  const { user } = useAuth();
  console.log(displayStats);

  useEffect(() => {
    setDisplayStats(stats);
  }, [stats]);

  useEffect(() => {
    const statsCol = collection(
      firestore,
      "users",
      user.uid,
      "pets",
      currentPet,
      "stats"
    );
    const q = query(statsCol, orderBy("date", "asc"));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((a) => a.data());
      setStats(data);
    });

    return () => {
      unSubscribe();
    };
  }, [currentPet, user.uid]);

  const segmentCallback = (value) => {
    setDisplayStats(getDaysAgo(value));
  };
  const getDaysAgo = (days) => {
    dayjs.extend(isBetween);
    const today = dayjs();
    const daysAgo = today.subtract(days, "day");
    const arr = stats.filter((data) =>
      dayjs(data.date).isBetween(daysAgo, today, [])
    );
    return arr;
  };
  const getRecentItem = (data, count) => {
    return data.slice(0, count);
  };

  const getTypeItem = (data, type) => {
    return data.filter(
      (item) => item[type] !== null && item[type] !== undefined
    );
  };

  const renderTabItem = ({ label, statsType, timeScaleOptions = [] }) => {
    const timeScale = [
      { label: "週", value: 7 },
      { label: "月", value: 30 },
      { label: "3 個月", value: 90 },
      ...timeScaleOptions,
    ].sort((a, b) => a.value - b.value);
    return (
      <Tabs.Item label={label} value={statsType}>
        <SegmentedControl
          segments={timeScale}
          name="timeScale"
          callback={segmentCallback}
          defaultIndex={0}
        />
        <StatsLineChart
          data={getTypeItem(displayStats, statsType)}
          dataKey={statsType}
        />
        <div className="stats-items">
          {getRecentItem(getTypeItem(stats, statsType), 10).map((item, i) => (
            <StatsItem data={item} type={statsType} key={i} />
          ))}
        </div>
      </Tabs.Item>
    );
  };

  return (
    <StyledStatsPage className="stats">
      <Tabs initialValue="weight" hideDivider>
        {renderTabItem({ label: "體重", statsType: "weight" })}
        {renderTabItem({
          label: "呼吸頻率",
          statsType: "breathRate",
        })}
        {renderTabItem({
          label: "心率",
          statsType: "heartRate",
          timeScaleOptions: [{ label: "2個月", value: 60 }],
        })}
      </Tabs>

      <ActionButton onClick={() => setShowDrawer(true)} />
      <StatsMenu
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        stats={stats}
        setStats={setStats}
        currentPet={currentPet}
      />
    </StyledStatsPage>
  );
}
