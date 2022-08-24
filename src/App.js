import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodPage from "./pages/FoodPage";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foods" element={<FoodPage />} />
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
