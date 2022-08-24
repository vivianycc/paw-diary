import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodPage from "./pages/FoodPage";
import CreateFoodPage from "./pages/CreateFoodPage";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foods" element={<FoodPage />} />
        <Route path="/foods/create" element={<CreateFoodPage />} />
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
