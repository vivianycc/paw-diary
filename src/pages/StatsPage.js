import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tabs } from "@geist-ui/core";
import SegmentedControl from "../components/SegmentedControl";
import ActionButton from "../components/ActionButton";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import StatsItem from "../components/StatsItem";
import StatsMenu from "../components/StatsMenu";
import StatsLineChart from "../components/StatsLineChart";

// const data = [
//   {
//     time: "2022/05/15",
//     weight: 4.1,
//     heartRate: 120,
//     breathRate: 45,
//   },
//   {
//     time: "2022/05/18",
//     weight: 4.15,
//     heartRate: 123,
//     breathRate: 43,
//   },
//   {
//     time: "2022/05/20",
//     weight: 4.18,
//     heartRate: 133,
//     breathRate: 30,
//   },

//   {
//     time: "2022/06/15",
//     weight: 4.32,
//     heartRate: 128,
//     breathRate: 47,
//   },
//   {
//     time: "2022/06/16",
//     weight: 4.48,
//     heartRate: 129,
//     breathRate: 35,
//   },
//   {
//     time: "2022/06/17",
//     weight: 4.39,
//     heartRate: 134,
//     breathRate: 39,
//   },
//   {
//     time: "2022/06/27",
//     weight: 4.2,
//     heartRate: 132,
//     breathRate: 35,
//   },
//   {
//     time: "2022/06/28",
//     weight: 4.2,
//     heartRate: 132,
//     breathRate: 35,
//   },
//   {
//     time: "2022/06/29",
//     weight: 4.2,
//     heartRate: 132,
//     breathRate: 35,
//   },
//   {
//     time: "2022/07/15",
//     weight: 4.1,
//     heartRate: 120,
//     breathRate: 45,
//   },
//   {
//     time: "2022/07/18",
//     weight: 4.15,
//     heartRate: 123,
//     breathRate: 43,
//   },
//   {
//     time: "2022/07/20",
//     weight: 4.18,
//     heartRate: 133,
//     breathRate: 30,
//   },

//   {
//     time: "2022/08/15",
//     weight: 4.32,
//     heartRate: 128,
//     breathRate: 47,
//   },
//   {
//     time: "2022/08/16",
//     weight: 4.48,
//     heartRate: 129,
//     breathRate: 35,
//   },
//   {
//     time: "2022/08/17",
//     weight: 4.39,
//     heartRate: 134,
//     breathRate: 39,
//   },
//   {
//     time: "2022/08/27",
//     weight: 4.2,
//     heartRate: 132,
//     breathRate: 35,
//   },
//   {
//     time: "2022/08/28",
//     weight: 4.2,
//     heartRate: 132,
//     breathRate: 35,
//   },
//   {
//     time: "2022/08/29",
//     weight: 4.2,
//     heartRate: 132,
//     breathRate: 35,
//   },
// ];

const StyledStatsPage = styled.div`
  padding-top: 32px;
`;

export default function StatsPage({ stats, setStats }) {
  const [displayStats, setDisplayStats] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  console.log(displayStats);

  useEffect(() => {
    setDisplayStats(stats);
  }, [stats]);

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
    <StyledStatsPage>
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
      />
    </StyledStatsPage>
  );
}
