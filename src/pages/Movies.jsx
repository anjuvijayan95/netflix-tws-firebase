import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import axios from "axios";

const Movies = ({ searchQuery }) => {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const responses = await Promise.all([
        axios.get(requests.requestUpcoming),
        axios.get(requests.requestPopular),
        axios.get(requests.requestTrending),
        axios.get(requests.requestTopRated),
        axios.get(requests.requestHorror),
      ]);

      // Combine all movies from different categories into a single list
      const movies = responses.flatMap((response) => response.data.results);
      setAllMovies(movies);
    };

    fetchMovies();
  }, []);

  // Filter movies based on search query
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Main />
      {searchQuery ? (
        <Row rowID="search" title="Search Results" movies={filteredMovies} />
      ) : (
        <>
          <Row rowID="1" title="Upcoming" fetchURL={requests.requestUpcoming} />
          <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
          <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
          <Row
            rowID="4"
            title="Top Rated"
            fetchURL={requests.requestTopRated}
          />
          <Row rowID="5" title="Horror" fetchURL={requests.requestHorror} />
        </>
      )}
    </>
  );
};

export default Movies;
