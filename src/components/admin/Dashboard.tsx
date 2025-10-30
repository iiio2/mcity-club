import { Helmet } from 'react-helmet-async'
import AdminLayout from '../../hoc/AdminLayout'

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>MCity Club - Dashboard</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>
      <AdminLayout>
        <div className="user_dashboard">
          <div>This is your dashboard</div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Dashboard
