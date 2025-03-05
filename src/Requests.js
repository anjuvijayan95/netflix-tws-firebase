  const key = 'YOUR_KEY'
const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=2&include_adult=false`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestPopularTV : `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,
    requestKidsMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=10751&page=1`
  };

  export default requests


