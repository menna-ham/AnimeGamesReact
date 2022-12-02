import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';
import { faChrome,faWindows } from '@fortawesome/free-brands-svg-icons';
import Pagination from '../Pagination/Pagination';
import FormSelect from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

export default function Platform() {
  let {platform} =useParams();
  let [gameByPlat,setGameByPlat]= useState([]);
  let [loading,SetLoading] = useState(false);

  let [page, setPage] = useState(0);
  let gamesPerPage = 12;
  let numberOfRecordsVistited = page * gamesPerPage;
  let totalPages = Math.ceil(gameByPlat.length / gamesPerPage);


  let getPlatformData=async()=>{
    SetLoading(true)

    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`,{headers:
    {'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
  })
  console.log(data);
  setGameByPlat(data);
  SetLoading(false)

  }

  let changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(()=>{
    getPlatformData()
  },[platform])

  return (
    loading?<Loading/>:
    <>
      <div className="container">
        <div className='d-flex flex-row '>
        <h2 className="my-5 text-danger text-capitalize"><FontAwesomeIcon icon={faDesktop} /> Platform : <span className="text-capitalize">{platform}</span></h2>

        <div className=" my-5 mx-3">

            <div class="dropdown text-center">
              <p class="btn btn-outline-danger dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select Platform
              </p>
              <ul class="dropdown-menu">
                <li><Link className='nav-link text-center'  to={'/platform/pc'}>PC</Link></li>
                <hr/>
                <li><Link className='nav-link text-center'  to={'/platform/browser'}>Browser</Link></li>
              </ul>
            </div>

        </div>

        </div>

        <div className="row g-4">
          {gameByPlat
            .slice(
              numberOfRecordsVistited,
              numberOfRecordsVistited + gamesPerPage
            ).map((game) => {
            return (
              <>
                <div key={game.id} className="col-lg-3 col-md-4 col-sm-6">
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
            );
          })}
        </div>

        <div className="py-5  w-75 m-auto ">
          <Pagination  
          totalPages={totalPages}
          changePage={changePage}
          />
          </div>

      </div>





    </>
  )
}
