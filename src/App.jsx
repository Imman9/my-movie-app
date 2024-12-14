import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import Favorites from "./pages/favorites/Favorites";
import Details from "./pages/Details/Details";
import NavBar from "./components/NavBar";
import Search from "./pages/search/search";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
