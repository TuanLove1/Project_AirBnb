import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { useNavigate } from "react-router-dom"

import styles from './index.css'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate();

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      className={`${styles.sidebar}`}
    >
      <div className='logo'>
          <img src="/images/logo.png" style={{ height : '50px', witdh : '50px'}} />
          <h1>AirBnb</h1>
          
      </div>
      <hr  width="100%" size="5px" align="center" color="yellow" />
      <CSidebarNav>
        <SimpleBar>
          <div className='title'>
            <a style={{textDecoration: 'none'}} onClick={()=>navigate("/admin/user")}>
            <span>Quản lý thông tin người dùng</span>
            </a>
          </div>
          <div className='title'>
            <a style={{textDecoration: 'none'}} onClick={()=>navigate("/admin/location")}>
            <span>Quản lý thông tin vị trí</span>
            </a>
          </div>
          <div className='title'>
            <a style={{textDecoration: 'none'}} onClick={()=>navigate("/admin/room")}>
            <span>Quản lý thông tin phòng</span>
            </a>
          </div>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
