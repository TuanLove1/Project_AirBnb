import React from 'react'
import { Footer } from '../../templates/HomeTemplate/Footer'
import {Outlet} from "react-router-dom"
import { Home } from '../../pages/HomePage/Home'
import { Header } from '../../templates/HomeTemplate/Header'
export const HomeTemplate = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
