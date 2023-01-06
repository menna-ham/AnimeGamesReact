import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { faChrome } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import {NavLink} from 'react-bootstrap';
import { faChessBoard } from '@fortawesome/free-solid-svg-icons';



export default function Categories() {
  let {category} = useParams()
  let [categorirzedGames, setCategorirzedGames] = useState([]);
  let [loading,SetLoading] = useState(false);

  let [page, setPage] = useState(0);
  let gamesPerPage = 12;
  let numberOfRecordsVistited = page * gamesPerPage;
  let totalPages = Math.ceil(categorirzedGames.length / gamesPerPage);
  let changePage = ({ selected }) => {
    setPage(selected);
  };

  let getCategorirzedGames= async()=>{

    SetLoading(true)
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    setCategorirzedGames(data);
    SetLoading(false)
  }

  useEffect(()=>{
    getCategorirzedGames()
  },[category])
  return (

    loading?<Loading/>:
    <>
      <div className="container">
        <div className="d-flex flex-row align-items-center">
        <h2 className="my-5 text-danger text-capitalize"><FontAwesomeIcon icon={faChessBoard} /> Category : <span className='text-capitailze'>{category}</span></h2>
        
        <div className='mt-4 mx-4'>
          <div className=" dropdown ">
            <p className='btn btn-outline-danger dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Select Category
            </p>
            <ul className="dropdown-menu">
              <li><Link className='nav-link text-center' to={'/categories/racing'}>Racing</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/sports'}>Sports</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/social'}>Social</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/shooter'}>Shooter</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/open-world'}>Open World</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/zombie'}>Zombie</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/fantasy'}>Fantasy</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/action-rpg'}>Action RPG</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/action'}>Action</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/flight'}>Flight</Link></li><hr/>
              <li><Link className='nav-link text-center' to={'/categories/battle-royale'}>Battle Royale</Link></li>
            </ul>
          </div>

        </div>

        </div>
        <div className="row g-4">
          {categorirzedGames
            .slice(
              numberOfRecordsVistited,
              numberOfRecordsVistited + gamesPerPage
            ).map((game) => {
            return (
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
            );
          })}
        </div>

          <div className="py-5 w-75 m-auto">
          <Pagination
                  totalPages={totalPages}
                  changePage={changePage}
        />

          
          </div>
      </div>
    </>
  );
}
