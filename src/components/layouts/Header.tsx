import { AppBar, Button, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import { logout, useAuth } from '../../services/auth'
import { CityLogo } from '../../utils/tools'

function Header() {
  const { user, isAdmin } = useAuth()

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: '#98c5e9',
        boxShadow: 'none',
        padding: '10px 0',
        borderBottom: '2px solid #00285e',
      }}
    >
      <Toolbar style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <CityLogo link={true} linkTo="/" width="70px" height="70px" />
          </div>
        </div>

        <Button color="inherit" component={Link} to="/the_matches">
          Matches
        </Button>

        <Button color="inherit" component={Link} to="/the_team">
          The team
        </Button>

        {isAdmin
          ? (
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            )
          : null}

        {user
          ? (
              <Button color="inherit" onClick={logout}>
                Log out
              </Button>
            )
          : null}
      </Toolbar>
    </AppBar>
  )
}

export default Header
