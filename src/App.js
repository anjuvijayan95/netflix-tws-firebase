import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import MovieDetails from './components/MovieDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Popular from './pages/Popular';
import { useState } from 'react';
import TVShow from './pages/TVShows';
import Movies from './pages/Movies';
import Kids from './pages/Kid';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AuthContextProvider>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/popular" element={<Popular searchQuery={searchQuery} />} />
        <Route path='/tvshows' element={<TVShow searchQuery={searchQuery}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:type/:id" element={<MovieDetails />} />
        <Route path='/movies' element={<Movies searchQuery={searchQuery}/>}/>
        <Route path='/kids' element={<Kids searchQuery={searchQuery}/>}/>
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}



export default App;
