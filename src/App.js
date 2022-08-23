import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FoodPage from "./components/FoodPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foods" element={<FoodPage />} />
      </Routes>
    </div>
  );
}

export default App;
