import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faGamepad, faPersonRifle } from '@fortawesome/free-solid-svg-icons';
import { faChrome } from '@fortawesome/free-brands-svg-icons';
import Loading from '../Loading/Loading';
import { Badge } from 'react-bootstrap';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

export default function Home() {

  const [Games, setGames] = useState([]);
  const [PlatGame, setPlatGame] = useState([]);
  const [catGame, setcatGame] = useState([]);
  const [sortGame, setSortGame] = useState([]);
  const [ReltGame, setRelGame] = useState([]);




  let [loading,SetLoading] = useState(false);

  let getGames = async()=>{
    let sliced;
    SetLoading(true);
    let {data}= await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{headers:
    {'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
  })
    sliced = data.slice(0,6)
    setGames(data);
    SetLoading(false)
    // console.log(Games);
  }

  let getPlatform = async()=>{
    SetLoading(true);
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser`,{headers:
    {'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
  })
    setPlatGame(data);
    SetLoading(false)
     console.log(data);
  }

  let getCategorirzedGames= async()=>{

    SetLoading(true)
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    setcatGame(data);
    SetLoading(false)
  }

  let getSortedData = async (sortby) => {
    SetLoading(true)
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    setSortGame(data);
    SetLoading(false)
  };

  let getRelevance = async () => {
    SetLoading(true)
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    setRelGame(data);
    SetLoading(false)
  };

  useEffect(()=>{
    
    getGames();
    getPlatform();
    getCategorirzedGames();
    getSortedData();
    getRelevance();

  },[])

  return (
    loading?<Loading/>:
    <>
    <div className={`${styles.homeBg} d-flex flex-column justify-content-center align-items-center`}>
      <h1>Find & track the best free-to-play games!</h1>
      <div className='fs-6 my-3'>Track what you've played and search for what to play next! Plus get free premium loot!</div>
      <Link to={'/all'} className='btn btn-danger my-2 '> Browse Games </Link>
      
    </div>
    <div className="container">
      <div className="row py-5">
        <div className="col-lg-8">
          <div className="games pb-4">
            <h2 className='text-danger my-3'> 
            <FontAwesomeIcon icon={faGamepad}className='me-2' />Personalized Recommendations
            </h2>
            <div className="row g-3">

            {
              Games.slice(0,12).map((game)=>{
                return(
                  <>
                  <div key={game.id} className="col-lg-4 col-md-6 ">
                  <Link
                    to={`/details/${game.id}`}
                    className=" nav-link game rounded-3 shadow w-100 h-100"
                  >
                    <div className={` `}>

                      <div className="w-100 h-100">
                      <img
                        src={game.thumbnail}
                        className="img-fluid rounded-top  m-sm-auto"
                      />
                      </div>

                      <div className="h-100 w-100 d-flex flex-column justify-content-center">

                        <div className="d-flex justify-content-between align-items-center p-2  ">
                          <h5> {game.title}</h5>
                          <a href={game.game_url} className="btn btn-success p-1 "
                          >Play</a>
                        </div>

                        {game.short_description ? (
                          <p className=" grayTxt p-2 fs-6 mb-0">
                            {game.short_description
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")}
                            ...
                          </p>
                        ) : (
                          ""
                        )}

                        <div className="px-2 fs-6 ">
                          <span className="fw-bold grayTxt"> Release Date :</span>
                          <span className="grayTxt">{game.release_date}</span>
                        </div>
                        
                        <div className=' mt-auto'>
                        <div className="d-flex justify-content-between p-2">
                          <Badge bg="danger">{game.genre}</Badge>{" "}
                          {game.platform == "PC (Windows)" ? (
                            <FontAwesomeIcon icon={faWindows} />
                          ) : (
                            <FontAwesomeIcon icon={faChrome} />
                          )}
                        </div>
                        </div>


                      </div>

                    </div>
                  </Link>

                  </div>
                  </>
                )
              })
            }
            </div>

          </div>

          <div className="games my-5">
            <div className='d-flex flex-row justify-content-between align-items-center'>
            <h2 className='text-danger my-3'> 
            <FontAwesomeIcon icon={faChrome}className='me-2' />Games on your Browser 
            </h2>
            <div>
              <Link className='nav-link text-white text-uppercase' to='/platform/browser'>View All <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            </div>

            <div className="row g-3">
            {
              PlatGame.slice(0,12).map((game)=>{
                return(
                  <>
                  <div key={game.id} className="col-lg-4 col-md-6 ">
                  <Link
                    to={`/details/${game.id}`}
                    className=" nav-link game rounded-3 shadow w-100 h-100"
                  >
                    <div className={` `}>

                      <div className="w-100 h-100">
                      <img
                        src={game.thumbnail}
                        className="img-fluid rounded-top  m-sm-auto"
                      />
                      </div>

                      <div className="h-100 w-100 d-flex flex-column justify-content-center">

                        <div className="d-flex justify-content-between align-items-center p-2  ">
                          <h5> {game.title}</h5>
                          <a href={game.game_url} className="btn btn-success p-1 "
                          >Play</a>
                        </div>

                        {game.short_description ? (
                          <p className=" grayTxt p-2 fs-6 mb-0">
                            {game.short_description
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")}
                            ...
                          </p>
                        ) : (
                          ""
                        )}

                        <div className="px-2 fs-6 ">
                          <span className="fw-bold grayTxt"> Release Date :</span>
                          <span className="grayTxt">{game.release_date}</span>
                        </div>
                        
                        <div className=' mt-auto'>
                        <div className="d-flex justify-content-between p-2">
                          <Badge bg="danger">{game.genre}</Badge>{" "}
                          {game.platform == "PC (Windows)" ? (
                            <FontAwesomeIcon icon={faWindows} />
                          ) : (
                            <FontAwesomeIcon icon={faChrome} />
                          )}
                        </div>
                        </div>


                      </div>

                    </div>
                  </Link>

                  </div>
                  </>
                )
              })
            }
            </div>

          </div>

          <div className="games my-5">
            <div className='d-flex flex-row justify-content-between align-items-center'>
            <h2 className='text-danger my-3'> 
            <FontAwesomeIcon icon={faPersonRifle}className='me-2' />Shooter 
            </h2>
            <div>
              <Link className='nav-link text-white text-uppercase' to='/categories/shooter'>View All <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            </div>

            <div className="row g-3">
            {
              catGame.slice(0,12).map((game)=>{
                return(
                  <>
                  <div key={game.id} className="col-lg-4 col-md-6 ">
                  <Link
                    to={`/details/${game.id}`}
                    className=" nav-link game rounded-3 shadow w-100 h-100"
                  >
                    <div className={` `}>

                      <div className="w-100 h-100">
                      <img
                        src={game.thumbnail}
                        className="img-fluid rounded-top  m-sm-auto"
                      />
                      </div>

                      <div className="h-100 w-100 d-flex flex-column justify-content-center">

                        <div className="d-flex justify-content-between align-items-center p-2  ">
                          <h5> {game.title}</h5>
                          <a href={game.game_url} className="btn btn-success p-1 "
                          >Play</a>
                        </div>

                        {game.short_description ? (
                          <p className=" grayTxt p-2 fs-6 mb-0">
                            {game.short_description
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")}
                            ...
                          </p>
                        ) : (
                          ""
                        )}

                        <div className="px-2 fs-6 ">
                          <span className="fw-bold grayTxt"> Release Date :</span>
                          <span className="grayTxt">{game.release_date}</span>
                        </div>
                        
                        <div className=' mt-auto'>
                        <div className="d-flex justify-content-between p-2">
                          <Badge bg="danger">{game.genre}</Badge>{" "}
                          {game.platform == "PC (Windows)" ? (
                            <FontAwesomeIcon icon={faWindows} />
                          ) : (
                            <FontAwesomeIcon icon={faChrome} />
                          )}
                        </div>
                        </div>


                      </div>

                    </div>
                  </Link>

                  </div>
                  </>
                )
              })
            }
            </div>

          </div>


        </div>
        <div className="col-lg-4 gy-3">
          <div className="popular">
            <div className='d-flex justify-content-between '>
              <h4>New Released </h4>
              <div>
              <Link className='nav-link text-white text-uppercase' to='/sortby/release-date'>View Newest <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            </div>
          </div>

          {
              sortGame.slice(0,5).map((game)=>{
                return(<>
                    <div key={game.id} className='mt-4 sortHome' >
                    <Link to={`/details/${game.id}`} className='nav-link game rounded-3 shadow' style={{color: "white",width:'100%', backgroundImage:`url(${game.thumbnail})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center center'}}>

                      <div className='h-100 d-flex flex-column' >

                        <div className=' p-2 d-flex justify-content-between align-items-center '>
                          <p className='bg-dark p-2 rounded-pill text-white '>{game.release_date}</p>
                          <span class="bg-danger p-2 rounded-pill ">{game.genre}</span>
                        </div>

                        <div className='mt-auto'>
                          <h4 className='text-danger px-3 fw-bold'> {game.title}</h4>
                        </div>

                      </div>
                    </Link>

                  </div>
                </>)
              })
            }


          <div className="relevance">
          

          <div className='d-flex justify-content-between  mt-5 mb-2'>
              <h4>Most Played</h4>
              <div>
              <Link className='nav-link text-white text-uppercase' to='/sortby/relevance'>View All <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            </div>
          </div>

          {
            ReltGame.slice(15,20).map((game)=>{
              return(
                <>
                <Link to={`/details/${game.id}`} className='nav-link rounded-3 shadow'>
                <div className="game w-100 d-flex flex-row align-items-center  my-3 ">

                  <div className="w-50">
                    <img src={game.thumbnail} alt={game.title} className='w-100' />
                  </div>
                  <div className='w-50 ms-3' >
                    <p className='h4 fw-bold'>{game.title}</p>
                    <p className='text-danger fw-bold'> {game.genre}</p>
                  </div>

                </div>
                </Link>


                </>
              )
            })
          }

        </div>

      </div>
    </div>    
    </>
  )
}
