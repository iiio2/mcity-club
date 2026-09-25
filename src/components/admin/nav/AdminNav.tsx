import { ListItemButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { logout } from '../../../services/auth'

const links = [
  {
    title: 'Matches',
    linkTo: '/admin_matches',
  },
  {
    title: 'Players',
    linkTo: '/admin_players',
  },
]

function AdminNav() {
  return (
    <>
      {links.map(link => (
        <ListItemButton
          key={link.title}
          component={Link}
          to={link.linkTo}
          className="admin_nav_link"
        >
          {link.title}
        </ListItemButton>
      ))}
      <ListItemButton className="admin_nav_link" onClick={logout}>
        Log out
      </ListItemButton>
    </>
  )
}

export default AdminNav
