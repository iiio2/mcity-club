import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/home/Index";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
