import React  from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import Loading from '../Loading/Loading'
import NavBar from '../NavBar/NavBar'

export default function MainLayout({userData,LogOut}) {

  return (
    <>
    <NavBar userData={userData} LogOut={LogOut}/>
    <div className='position-relative'>
    <Outlet/>
    </div>
    <Footer/>

    </>
  )
}
