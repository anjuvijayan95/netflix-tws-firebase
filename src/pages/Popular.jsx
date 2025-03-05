import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import axios from "axios";

const Popular = ({ searchQuery }) => {
  const [popular, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responses = await axios.get(requests.requestPopular);

        // Extract results correctly
        const movies = responses?.data?.results;

        setPopularMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on search query
  const filteredMovies = popular.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Main />
      {searchQuery ? (
        <Row rowID="search" title="Search Results" movies={filteredMovies} />
      ) : (
        <>
          <Row rowID="1" title="Popular" fetchURL={requests.requestPopular} />
        </>
      )}
    </>
  );
};

export default Popular;
