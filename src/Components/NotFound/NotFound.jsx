import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'


export default function NotFound() {
  return (
    <>
    <div className='notFound  container d-flex flex-column justify-content-center align-items-center'>

      <div >

      <FontAwesomeIcon icon={faTriangleExclamation} className='text-danger' size={'10x'}/>

      </div>
      <h2 className='text-danger'> Something went wrong please go back to  <Link className='' to='/home'> Home</Link></h2>


    </div>

    </>
  )
}
