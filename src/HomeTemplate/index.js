import React from 'react'
import { Footer } from './Footer'
import {Outlet} from "react-router-dom"
import { Home } from '../pages/Home'
export const HomeTemplate = () => {
  return (
    <div>
      <Home/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
