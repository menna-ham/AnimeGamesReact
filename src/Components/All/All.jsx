import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './All.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import { Badge } from 'react-bootstrap';
import { faChrome,faWindows } from '@fortawesome/free-brands-svg-icons';


export default function All() {
  let [All , setAll] = useState([]);
  let [loading,SetLoading] = useState(false);

  let [page, setPage] = useState(0);
  let gamesPerPage = 12;
  let numberOfRecordsVistited = page * gamesPerPage;
  let totalPages = Math.ceil(All.length /gamesPerPage);
  let changePage = ({ selected }) => {
    setPage(selected);
  };
  
  let getAllGames =async()=>{
    SetLoading(true)
    let {data} =await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{headers:
    {'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}
  })
    setAll(data)
    SetLoading(false)
  }
 
  useEffect(()=>{
    getAllGames();
  },[])


  return (
    
      loading?
      <Loading/>:
    <>
      <div className="container py-5">
        <div className="title">
          <h2 className='text-danger text-uppercase my-3'><FontAwesomeIcon icon={faPuzzlePiece} /> All Games</h2>
          <div className="row g-4">
            {
              All
              .slice(
                numberOfRecordsVistited,
                numberOfRecordsVistited + gamesPerPage
              ).map((game)=>{
                return(
                  <>
                  <div key={game.id} className="col-lg-3 col-md-4">
                    <Link
                      to={`/details/${game.id}`}
                      className=" nav-link game rounded-3 shadow"
                    >
                      <div className={`  `}>
                        <img
                          src={game.thumbnail}
                          className="img-fluid rounded-top"
                        />
                        <div className=" d-flex flex-column justify-content-between">
                          <div className="d-flex justify-content-between align-items-center p-2 ">
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
  
                          <div className="px-2 fs-6">
                            <span className="fw-bold grayTxt"> Release Date :</span>
                            <span className="grayTxt">{game.release_date}</span>
                          </div>
  
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
                    </Link>
                  </div>
                </>
                )

              })
            }

          </div>
        </div>
        <div className="py-5 w-75 m-auto">
          <Pagination
                  totalPages={totalPages}
                  changePage={changePage}
                  containerClassName={"navigationButtons"}
                  previousLinkClassName={"previousButton"}
                  nextLinkClassName={"nextButton"}
                  disabledClassName={"navigationDisabled"}
                  activeClassName={"navigationActive"} 
        />
          </div>
      </div>
    </>
  )
}
