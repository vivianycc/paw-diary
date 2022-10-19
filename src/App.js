import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodPage from "./pages/FoodPage";
import StatsPage from "./pages/StatsPage";
import FoodSearch from "./pages/FoodSearch";
import CreateFoodPage from "./pages/CreateFoodPage";
import AddFoodPage from "./pages/AddFoodPage";
import DiaryPage from "./pages/DiaryPage";
import AddFoodRecordPage from "./pages/AddFoodRecordPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [currentPet, setCurrentPet] = useState("pet1");
  const [pets, setPets] = useState({
    pet1: {
      info: {
        name: "可麗露",
        species: "cat",
        breed: "mix",
        birthday: "2020/10/15",
        age: "3 months",
        weight: 4.0,
        photoUrl: "http://placekitten.com/g/200/100",
        neutered: true,
        sex: "f",
        chipNum: 1234,
      },
      foods: [],
      stats: [],
    },
    pet2: {
      info: {
        name: "可露",
        species: "cat",
        breed: "mix",
        birthday: "2020/10/15",
        age: "10 months",
        weight: 4.0,
        photoUrl: "http://placekitten.com/g/250/300",
        neutered: true,
        sex: "f",
        chipNum: 1234,
      },
      foods: [],
      stats: [],
    },
    pet3: {
      info: {
        name: "可麗",
        species: "cat",
        breed: "mix",
        birthday: "2020/10/15",
        age: "1 years old",
        weight: 4.0,
        photoUrl: "http://placekitten.com/g/200/200",
        neutered: true,
        sex: "f",
        chipNum: 1234,
      },
      foods: [],
      stats: [],
    },
  });
  const [foods, setFoods] = useState([]);
  const [stats, setStats] = useState([
    // {
    //   date: "2022-06-15",
    //   weight: 4.1,
    //   heartRate: 120,
    //   breathRate: 45,
    // },
    // {
    //   date: "2022-06-18",
    //   weight: 4.15,
    //   heartRate: 123,
    //   breathRate: 43,
    // },
    // {
    //   date: "2022-08-20",
    //   weight: 4.18,
    //   heartRate: 133,
    //   breathRate: 30,
    // },
  ]);
  const [diaries, setDiaries] = useState([
    {
      date: "2022/10/01",
      note: "今天好像特別有活力！",
      foodRecord: [],
      photos: [],
    },
    {
      date: "2022/10/02",
      note: "今天好像特別有活力！",
      foodRecord: [],
      photos: [],
    },
    {
      date: "2022/10/03",
      note: "今天好像特別有活力！",
      foodRecord: [],
      photos: [],
    },
    {
      date: "2022/10/07",
      note: "今天好像特別有活力！",
      foodRecord: [
        {
          foodBrand: "魔力喵",
          foodProduct: "精緻時光主食罐",
          foodFlavor: "鮭魚＆火雞",
          foodId: "12345",
          calories: 96,
          portion: 30,
          time: "08:30am",
        },
        {
          foodBrand: "魔力喵",
          foodProduct: "精緻時光主食罐",
          foodFlavor: "鮭魚＆火雞",
          foodId: "12345",
          calories: 96,
          portion: 30,
          time: "08:30am",
        },
        {
          foodBrand: "魔力喵",
          foodProduct: "精緻時光主食罐",
          foodFlavor: "鮭魚＆火雞",
          foodId: "12345",
          calories: 96,
          portion: 30,
          time: "08:30am",
        },
        {
          foodBrand: "魔力喵",
          foodProduct: "精緻時光主食罐",
          foodFlavor: "鮭魚＆火雞",
          foodId: "12345",
          calories: 96,
          portion: 30,
          time: "08:30am",
        },
        {
          foodBrand: "魔力喵",
          foodProduct: "精緻時光主食罐",
          foodFlavor: "鮭魚＆火雞",
          foodId: "12345",
          calories: 96,
          portion: 30,
          time: "08:30am",
        },
        {
          foodBrand: "魔力喵",
          foodProduct: "精緻時光主食罐",
          foodFlavor: "鮭魚＆火雞",
          foodId: "12345",
          calories: 96,
          portion: 30,
          time: "08:30am",
        },
      ],
      photos: [],
    },
  ]);

  const switchPet = (currentPet, nextPet) => {
    setPets({
      ...pets,
      [currentPet]: {
        ...pets[currentPet],
        foods: foods,
        stats: stats,
      },
    });
    setFoods(pets[nextPet].foods);
    setStats(pets[nextPet].stats);
    setCurrentPet(nextPet);
  };

  useEffect(() => {
    const pets = JSON.parse(localStorage.getItem("pets"));
    if (Object.keys(pets).length === 0) {
      setPets(pets);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pets", JSON.stringify(pets));
  }, [pets]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              currentPet={currentPet}
              pets={pets}
              setCurrentPet={setCurrentPet}
              switchPet={switchPet}
            />
          }
        >
          <Route index element={<DiaryPage diaries={diaries} />} />
          <Route path="foods" element={<FoodPage foods={foods} />} />
          <Route
            path="stats"
            element={<StatsPage stats={stats} setStats={setStats} />}
          />
        </Route>
        <Route path="foods/create" element={<CreateFoodPage />} />
        <Route
          path="foods/records/add"
          element={
            <AddFoodRecordPage
              diaries={diaries}
              addfoodRecordHandler={setDiaries}
            />
          }
        />
        <Route
          path="/foods/add"
          element={<AddFoodPage foods={foods} addFoodHandler={setFoods} />}
        />
        <Route path="foods/search" element={<FoodSearch foods={foods} />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
