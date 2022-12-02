import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import styles from './GameDetails.module.css'
import SimpleSlider from './Slider';

export default function GameDetails() {
  let [Game,setGame] = useState({})
  let {id} = useParams();
  let [loading,SetLoading] = useState(false);
  
  let req= Game.minimum_system_requirements;
  // let{os,Memory,graphics,processor} = Game['minimum_system_requirements'];

  
  let gameDetails = async()=>{
    SetLoading(true)
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,{headers:
    {'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
  })
    setGame(data)
    console.log(data);
    SetLoading(false)
  }


  let fullDesc=()=>{
  if(document.getElementById('fullDesc') && document.getElementById('see')){
    if(document.getElementById('see').innerHTML=='See More')
    {
      document.getElementById('fullDesc').innerHTML= Game.description.split(' ').slice(40,).join(' ');
      document.getElementById('see').innerHTML='See Less'
    }else if( document.getElementById('see').innerHTML=='See Less')
    {
      document.getElementById('fullDesc').innerHTML='';
      document.getElementById('see').innerHTML='See More';
    }
  }
  
  }


  useEffect(()=>{
    gameDetails()
  },[])


  return (
    loading?<Loading/>:
    <>
    <div className=' p-3'  style={{color: "white",width:'100%', backgroundImage:`url(${Game.thumbnail})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'}}>
      <div className=' row'>
      <div className='col-lg-8 col-sm-12'>
      <div className={ 'p-3  rounded-3  '+ styles.info}>
        <h2 className='text-danger h1 my-3'>{Game.title}</h2>
        <h3 className='my-2 '>Description :</h3>

        <div className='mx-2'>
          {Game.description?<span className='w-75 fs-6 grayTxt'>{Game.description.split(' ').slice(0,40).join(' ')}</span> : ''}
          <span className='grayTxt' id='fullDesc'></span>

        <p className={`text-info fs-5 fw-bold  pointer-event ${styles.see}`} id='see' onClick={fullDesc} >See More</p>
        </div>



        <div >
          <h3 className=' '>Additional information :</h3>
          <div className='mx-2 row g-3 mx-sm-1'>
            <div className='col-md-4 '>
              <span className='text-danger fw-bold me-2'>Release Date :</span>
              <span className='grayTxt'>{Game.release_date}</span>
            </div>
            <div className='col-md-4'>
              <span className='text-danger fw-bold me-2'>Publisher :</span>
              <span className='grayTxt'>{Game.publisher}</span>
            </div>
            <div className='col-md-4'>
              <span className='text-danger fw-bold me-2'>Developer :</span>
              <span className='grayTxt'>{Game.developer}</span>
            </div>

          </div>
        </div>

        {Game.minimum_system_requirements?
        <div className='my-3'>
          <h3 className=''>Minimum Requirments :</h3>
          <div className="mx-2 row g-4">
            { 
             req?<>     
              <div className="col-md-6">

                {req['os']? <div>
                <span className="text-danger text-capetailze" > OS :</span>
                <span className='grayTxt'> { req['os']}</span></div>:""}
              </div>
              <div className="col-md-6">
                {req['procesor']?<div>
                <span className="text-danger text-capetailze" > Processor :</span>
                <span className='grayTxt'> { req['processor']}</span>
                </div>:""}
              </div>
              <div className="col-md-6">
                {req['Memory']?                <div>
                <span className="text-danger text-capetailze" > Memory :</span>
                <span className='grayTxt'> { req['Memory']}</span>
                </div>:''}

              </div>
              <div className="col-md-6">
                {req['graphics']?<div>
                <span className="text-danger text-capetailze" > Graphics :</span>
                <span className='grayTxt'> { req['graphics']}</span>
                </div> :''}
                

              </div>
               </>
               :' '
            }
          </div>
        </div>
         :''} 


        <div className='mx-3 my-4 '>
          <a href={`${Game.game_url}`} target='_blank' className='btn btn-success p-3 m-auto my-2'>Play Game</a>
        </div>

      </div>
      </div>

      </div>
    </div>
    
    <div className={` w-75 m-auto py-4 px-3 w-sm-100 px-sm-1`}>

      <SimpleSlider imgs={Game.screenshots} title={Game.title} />


    </div>
    </>
  )
}
