import React from 'react'
import styles from './NavBar.module.css'
import logo from '../../Imgs/logo.png'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar({userData,LogOut}) {
  return (
    <>
    <nav className="navbar navbar-expand-lg  navbar-dark">
  <div className="container">
    <div className='d-flex justify-content-between'>

    <Link className={"navbar-brand "} to={'/'}> 
    <span className={styles.navlogo}>
    <img src={logo} className={styles.Logo} /> <span className='fs-4'>Ani<span className='text-danger'>me</span></span>
    </span>
    </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    </div>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {userData!=null?  
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive? 'nav-link active bg-danger rounded-3 text-bold text-uppercase': 'nav-link active'} aria-current="page" to={'/'}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive? 'nav-link active bg-danger rounded-3 text-bold text-uppercase': 'nav-link active'} to={'/all'}>All</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className={'nav-link dropdown-toggle ' + styles.drop} role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'}  to={'/platform/pc'}>PC</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/platform/browser'}>Browser</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className='nav-link dropdown-toggle'  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort By 
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/sortby/release-date'}>Release Date</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/sortby/popularity'}>Popularity</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/sortby/alphabetical'}>Alphabetical</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'sortby/relevance'}>Relevance</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className='nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/racing'}>Racing</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/sports'}>Sports</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/social'}>Social</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/shooter'}>Shooter</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/open-world'}>Open World</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/zombie'}>Zombie</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/fantasy'}>Fantasy</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/action-rpg'}>Action RPG</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/action'}>Action</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/flight'}>Flight</NavLink></li>
            <li><NavLink className={({isActive})=>isActive?`dropdown-item bg-danger text-white`:'dropdown-item'} to={'/categories/battle-royale'}>Battle Royale</NavLink></li>
        
          </ul>
        </li>
        <li className="nav-item">
          <span onClick={LogOut} className="nav-link text-white btn btn-outline-danger">LogOut</span>
        </li>

      </ul> :    
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive? 'nav-link active bg-danger rounded-3 text-bold text-uppercase': 'nav-link active'} aria-current="page" to={'/register'} >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive? 'nav-link active bg-danger rounded-3 text-bold text-uppercase': 'nav-link active'} to={'/login'}>Login</NavLink>
        </li>


      </ul> }



    </div>
  </div>
</nav>
    </>
  )
}
