import { Helmet } from 'react-helmet-async'
import { logout } from '../services/auth'

function NoAccess() {
  return (
    <>
      <Helmet>
        <title>MCity Club - No Access</title>
        <meta property="og:title" content="No Access" />
      </Helmet>
      <div className="not_found_container">
        <div>Sorry :(</div>
        <div>This account has no admin access</div>
        <button type="button" className="no_access_logout" onClick={logout}>
          Log out
        </button>
      </div>
    </>
  )
}

export default NoAccess
