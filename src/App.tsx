import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/home/Index";
import SignIn from "./components/signIn/Index";

function App({ user }:any) {
  return (
    <main>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<SignIn user={user} />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
