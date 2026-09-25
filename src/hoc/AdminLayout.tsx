import type { ReactNode } from 'react'
import AdminNav from '../components/admin/nav/AdminNav'

interface Props {
  title?: string
  children: ReactNode
}

function AdminLayout({ title, children }: Props) {
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>
      <div className="admin_right">
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
