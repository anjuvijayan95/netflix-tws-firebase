import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import Navbar from "./Navbar"; // Ensure you have a Navbar component
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

const MovieDetails = () => {
  const { type, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [video, setVideo] = useState({
    name: "",
    key: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=f641536f70f5b1c2443cc1d2e54245e6`
        );
        const data = await response.json();
        if (data) {
          setMovie(data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  const handleClick = (id, type) => {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
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
    <div
      className="relative w-full h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <Navbar />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 md:px-20">
        <h1 className="text-3xl md:text-5xl font-bold">
          {movie.title ? movie.title : movie.name}
        </h1>
        <p className="mt-4 max-w-lg text-sm md:text-lg">{movie.overview}</p>
        <div className="flex space-x-3 mt-4">
          <button
            className="flex items-center gap-2 bg-white text-black py-2 px-4 rounded-md text-sm md:text-lg font-semibold hover:bg-gray-300 transition"
            onClick={() => handleClick(movie.id, type)}
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

            {/* <FaPlay className="h-5 w-5" /> Play */}
          </button>
          <button className="flex items-center gap-2 bg-gray-700/70 py-2 px-4 rounded-md text-sm md:text-lg font-semibold hover:bg-gray-600 transition">
            <IoIosInformationCircle className="h-6 w-6" /> More Info
          </button>
        </div>
      </div>

      {showPlayer && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video?.key}`}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: "0", left: "0" }}
          controls={true}
          playing={showPlayer}
        />
      )}
    </div>
  );
};

export default MovieDetails;
