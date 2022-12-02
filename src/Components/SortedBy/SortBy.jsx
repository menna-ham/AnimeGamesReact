import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChrome, faWindows } from "@fortawesome/free-brands-svg-icons";
import { Badge } from "react-bootstrap";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import { faFilter } from "@fortawesome/free-solid-svg-icons";



export default function SortBy() {
  let {sortby} = useParams();
  let [sortedGames, setSortedGames] = useState([]);
  let [loading,setLoading] = useState(false);

  let [page, setPage] = useState(0);
  let gamesPerPage = 12;
  let numberOfRecordsVistited = page * gamesPerPage;
  let totalPages = Math.ceil(sortedGames.length / gamesPerPage);
  let changePage = ({ selected }) => {
    setPage(selected);
  };

  let getSortedData = async (sortby) => {
    setLoading(true)
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortby}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    setSortedGames(data);
    setLoading(false)
  };

  useEffect(() => {
    getSortedData(sortby)
  }, [sortby]);
  return (
    loading?<Loading/>:
    <>
      <div className="container">
        <div className="d-flex flex-row">

        <h2 className="my-5 text-danger text-capitalize"><FontAwesomeIcon icon={faFilter} /> Sort By : <span className="text-capitalize">{sortby}</span></h2>

        <div className=" my-5 mx-3">

            <div class="dropdown text-center">
              <p class="btn btn-outline-danger dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort By
              </p>
              <ul class="dropdown-menu">
            <li><Link className='nav-link text-center'  to={'/sortby/release-date'}>Release Date</Link></li><hr/>
            <li><Link className='nav-link text-center'  to={'/sortby/popularity'}>Popularity</Link></li><hr/>
            <li><Link className='nav-link text-center'  to={'/sortby/alphabetical'}>Alphabetical</Link></li><hr/>
            <li><Link className='nav-link text-center'  to={'sortby/relevance'}>Relevance</Link></li>
              </ul>
            </div>
            
        </div>
        </div>
        <div className="row g-4">
          {sortedGames
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
                  containerClassName={"navigationButtons"}
                  previousLinkClassName={"previousButton"}
                  nextLinkClassName={"nextButton"}
                  disabledClassName={"navigationDisabled"}
                  activeClassName={"navigationActive"} 
        />
          </div>
      </div>
    </>
  );
}
