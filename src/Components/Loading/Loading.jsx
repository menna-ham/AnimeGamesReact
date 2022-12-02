import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import styles from './Loading.module.css'


export default function Loading () {
  return (
    <>
    <div className={`position-absolute w-100  d-flex align-items-center justify-content-center ${styles.loadPage}`}>

      <div className='w-50 fs-1 text-center text-uppercase d-flex flex-row justify-content-evenly '>

        <p className={styles.pStyle}>l</p>
        <p className={styles.pStyle}>o</p>
        <p className={styles.pStyle}>a</p>
        <p className={styles.pStyle}>d</p>
        <p className={styles.pStyle}>i</p>
        <p className={styles.pStyle}>n</p>
        <p className={styles.pStyle}>g</p>


      </div>

    </div>
    </>
  )
}
