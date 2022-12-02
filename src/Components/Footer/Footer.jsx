import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
    <div className='footer '>
    <div className="container  p-5">
        <div className="row">
            <div className="col-md-4">
                <div className='text-center'>
                    <h3>Ani<span className='text-danger'>me</span></h3>
                </div>
            </div>
            <div className="col-md-4">
                <div className="links  d-flex justify-content-between align-items-center text-white fs-5">
                    <Link className={styles.navLink} to='/all'>All</Link>
                    <Link className={styles.navLink} to='/platform/pc'>Platform</Link>
                    <Link className={styles.navLink} to='/categories/racing'>Category</Link>
                    <Link className={styles.navLink} to='/sortby/release-date'>SortBy</Link>

                </div>
            </div>
            <div className="col-md-4">
                <div className='px-3'>
                    <p className='text-muted text-center'>Copyright ©2022 All rights reserved | This template is made with  by</p>
                </div>
            </div>
        </div>

    </div>
    </div>

    </>
  )
}
