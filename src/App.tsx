import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/home/Index";
import SignIn from "./components/signIn/Index";
import TheMatches from "./components/theMatches/Index";
import TheTeam from "./components/theTeam/Index";

function App({ user }: any) {
  return (
    <main>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<SignIn user={user} />} />
        <Route path="/the_matches" element={<TheMatches />} />
        <Route path="/the_team" element={<TheTeam />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
