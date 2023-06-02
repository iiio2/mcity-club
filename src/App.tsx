import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/home/Index";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
