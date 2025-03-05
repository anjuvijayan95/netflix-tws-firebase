import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";
import axios from "axios";

const TVShow = ({ searchQuery }) => {
  const [tvshow, setTvShow] = useState([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await axios.get(requests.requestPopularTV);

        // Ensure data exists before setting state
        const shows = response?.data?.results || [];
        setTvShow(shows);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchTVShows();
  }, []);

  // Log updated state when it changes
  useEffect(() => {
    console.log(tvshow);
  }, [tvshow]);

  const filteredTVShows = tvshow?.filter((show) =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Main />
      {searchQuery ? (
        <Row rowID="search" title="Search Results" movies={filteredTVShows} />
      ) : (
        <>
          <Row rowID="1" title="TV Show" movies={tvshow} />
        </>
      )}
    </>
  );
};

export default TVShow;
