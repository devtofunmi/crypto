import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinDetails from "./pages/CoinDetails";
import Fav from "./pages/Fav";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:coin" element={<CoinDetails />} />
          <Route path="/favcoin" element={<Fav />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
