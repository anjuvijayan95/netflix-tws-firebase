import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      const type = item.first_air_date ? "tv" : "movie";
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title || item.name,
          img: item.backdrop_path,
          type: type,
        }),
      });
    } else {
      alert("Please log in to save a movie or TV show");
    }
  };

  // Navigate to the individual movie page
  const handleClick = () => {
    let type;
    if (item.first_air_date) {
      type = "tv";
      navigate(`/${type}/${item?.id}`);
    } else {
      type = "movie";
      navigate(`/${type}/${item?.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title || item?.name}
        </p>
        <p
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking on heart icon
            saveShow();
          }}
        >
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
