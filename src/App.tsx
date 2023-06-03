import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/home/Index";
import SignIn from "./components/signIn/Index";
import TheMatches from "./components/theMatches/Index";
import TheTeam from "./components/theTeam/Index";
import Dashboard from "./components/admin/Dashboard";
import AdminMatches from "./components/admin/matches/Index";
import MatchForm from "./components/admin/matches/MatchForm";
import AdminPlayers from "./components/admin/players/Index";
import PlayerForm from "./components/admin/players/PlayerForm";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";

function App({ user }: any) {
  return (
    <main>
      <ToastContainer />
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<SignIn user={user} />} />
        <Route path="/the_matches" element={<TheMatches />} />
        <Route path="/the_team" element={<TheTeam />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin_matches" element={<AdminMatches />} />
        <Route path="/admin_matches/add_match" element={<MatchForm />} />
        <Route
          path="/admin_matches/edit_match/:matchid"
          element={<MatchForm />}
        />
        <Route path="/admin_players" element={<AdminPlayers />} />
        <Route path="/admin_players/add_player/" element={<PlayerForm />} />
        <Route
          path="/admin_players/edit_player/:playerid"
          element={<PlayerForm />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
