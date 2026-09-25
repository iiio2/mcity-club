import type { ComponentType } from 'react'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './components/home/Index'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import NotFound from './components/notFound'
import SignIn from './components/signIn/Index'
import TheMatches from './components/theMatches/Index'
import TheTeam from './components/theTeam/Index'
import AuthGuard from './hoc/AuthGuard'

// The admin area is only for signed-in admins, so keep it out of the main bundle.
const Dashboard = lazy(() => import('./components/admin/Dashboard'))
const AdminMatches = lazy(() => import('./components/admin/matches/Index'))
const MatchForm = lazy(() => import('./components/admin/matches/MatchForm'))
const AdminPlayers = lazy(() => import('./components/admin/players/Index'))
const PlayerForm = lazy(() => import('./components/admin/players/PlayerForm'))

const adminRoutes: [path: string, Page: ComponentType][] = [
  ['/dashboard', Dashboard],
  ['/admin_matches', AdminMatches],
  ['/admin_matches/add_match', MatchForm],
  ['/admin_matches/edit_match/:matchid', MatchForm],
  ['/admin_players', AdminPlayers],
  ['/admin_players/add_player', PlayerForm],
  ['/admin_players/edit_player/:playerid', PlayerForm],
]

function App() {
  return (
    <main>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/the_matches" element={<TheMatches />} />
        <Route path="/the_team" element={<TheTeam />} />
        {adminRoutes.map(([path, Page]) => (
          <Route
            key={path}
            path={path}
            element={(
              <AuthGuard>
                <Suspense fallback={null}>
                  <Page />
                </Suspense>
              </AuthGuard>
            )}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
