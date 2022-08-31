import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodPage from "./pages/FoodPage";
import StatsPage from "./pages/StatsPage";
import FoodSearch from "./pages/FoodSearch";
import CreateFoodPage from "./pages/CreateFoodPage";
import AddFoodPage from "./pages/AddFoodPage";
function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const foods = JSON.parse(localStorage.getItem("foods"));
    if (foods.length) {
      setFoods(foods);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="foods" element={<FoodPage foods={foods} />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
        <Route path="foods/create" element={<CreateFoodPage />} />
        <Route
          path="/foods/add"
          element={<AddFoodPage foods={foods} addFoodHandler={setFoods} />}
        />
        <Route path="foods/search" element={<FoodSearch foods={foods} />} />
      </Routes>
    </div>
  );
}

export default App;
