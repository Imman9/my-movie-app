import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import Favorites from "./pages/favorites/Favorites";
import Details from "./pages/Details/Details";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/datails/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
