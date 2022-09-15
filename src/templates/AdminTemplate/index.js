import React, { useEffect } from 'react'
import AppContent from './AppContent'
import AppSidebar from './AppSidebar'
import styles from './index.css'

const AdminTemplate = () => {
  useEffect(() => {
    const jwtToken = localStorage.getItem("token")
    if (jwtToken === null) {
      return window.location.href = '#/login'
    }
  }, [])
  return (
    <div className="admin">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default AdminTemplate
