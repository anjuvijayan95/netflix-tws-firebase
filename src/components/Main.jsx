import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

const Main = () => {
  let display;
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [isDetails, setIsDetails] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Store selected movie
  const [showPlayer, setShowPlayer] = useState(false);
  const [video, setVideo] = useState({
    name: "",
    key: "",
  });

  useEffect(() => {
    if (location.pathname == "/") {
      display = requests.requestTrending;
    } else if (location.pathname == "/tvshows") {
      display = requests.requestPopularTV;
    } else if (location.pathname == "/popular") {
      display = requests.requestPopular;
    } else if (location.pathname == "/movies") {
      display = requests.requestTopRated;
    } else if (location.pathname == "/kids") {
      display = requests.requestKidsMovies;
    }
    axios.get(display).then((response) => {
      setMovies(response.data.results);
      setSelectedMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num && isDetails == false) {
      return str.slice(0, num) + "...";
    } else if (isDetails == true) {
      return str;
    } else {
      return str;
    }
  };

  const handleClick = (id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setVideo(res.results[1]))
      .catch((err) => console.error(err));

    setShowPlayer(!showPlayer);
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjQxNTM2ZjcwZjViMWMyNDQzY2MxZDJlNTQyNDVlNiIsIm5iZiI6MTcxMDc1OTA1OS45NTEsInN1YiI6IjY1ZjgxYzkzYTZmZGFhMDE3ZDZmNGYxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mqauwt2rdWhoZlzoHCCQQkRH-gwc56KjkPR42O443TA",
    },
  };

  return (
    <div className="w-full h-[650px] text-white relative">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          className=" absolute w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`}
          alt={selectedMovie?.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Video Player - Positioned Exactly Like the Background Image */}
      {showPlayer && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video?.key}`}
            width="100%"
            height="100%"
            className="absolute top-0 left-0 w-full h-full object-cover"
            controls={true}
            playing={showPlayer}
          />
        </div>
      )}

      {/* Main Content - Positioned Above the Background & Video */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 md:px-10">
        <h1 className="text-3xl md:text-5xl font-bold">
          {selectedMovie?.title || selectedMovie?.name}
        </h1>
        <p className="text-gray-300 text-sm md:text-lg max-w-lg mt-2">
          {truncateString(selectedMovie?.overview, 150)}
        </p>

        <div className="flex space-x-3 mt-4">
          <button
            className="flex items-center gap-2 bg-white text-black py-2 px-4 rounded-md text-sm md:text-lg font-semibold hover:bg-gray-300 transition"
            onClick={() => handleClick(selectedMovie.id)}
          >
            {showPlayer ? (
              <>
                <FaPause className="h-5 w-5" /> Pause
              </>
            ) : (
              <>
                <FaPlay className="h-5 w-5" /> Play
              </>
            )}
          </button>

          <button
            className="flex items-center gap-2 bg-gray-700/70 py-2 px-4 rounded-md text-sm md:text-lg font-semibold hover:bg-gray-600 transition"
            onClick={() => {
              setIsDetails(!isDetails);
            }}
          >
            {isDetails ? (
              <>
                <IoIosInformationCircle className="h-6 w-6" /> Less Info
              </>
            ) : (
              <>
                <IoIosInformationCircle className="h-6 w-6" /> More Info
              </>
            )}
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-2">
          Released: {selectedMovie?.release_date}
        </p>
      </div>
    </div>
  );
};

export default Main;
