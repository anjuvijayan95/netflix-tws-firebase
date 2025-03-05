React Movie App 🎬
This is a React project that uses Firebase for data handling and authentication and Tailwind CSS for the UI and Axios for data fetching. This app is mobile responsive too.

🚀 How to Run the Application
1️⃣ Clone and Install Dependencies
After cloning the project, install the required dependencies:
npm i

2️⃣ Run and Build the Project
To run the project:
npm start

To build the project:
npm run build

3️⃣ Firebase Setup
Create an account on Firebase and add your credentials in the .env file:

# Firebase Configuration  
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY  
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN  
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID  
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET  
REACT_APP_MESSAGING_SENDER=YOUR_MESSAGING_SENDER  
REACT_APP_APP_ID=YOUR_APP_ID  

4️⃣ TMDB API Setup
Create an account on TMDB (The Movie Database) and get an API key.
Replace 'YOUR_KEY' in Request.js file:

const key = 'YOUR_KEY';  

const requests = {  
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,  
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,  
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,  
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=2&include_adult=false`,  
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,  
  requestPopularTV: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,  
  requestKidsMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=10751&page=1`,  
};  

export default requests;
   Features
🔹 Authentication
Users must Sign Up before accessing the app fully.
Firebase authentication is used to validate login credentials.
Sign-in and sign-up functionalities are handled in Firebase.js and AuthContext.js.

SignUp image<br>
<img src="https://github.com/anjuvijayan95/netflix-tws-firebase/blob/main/src/assets/img/SignUp.PNG" width="300px">

SignIn image<br>
<img src="https://github.com/anjuvijayan95/netflix-tws-firebase/blob/main/src/assets/img/SignIn.PNG" width="300px">

🔹 Home Page
When you run the project, the Home Page appears.
If you don't have an account, click Sign Up to create one.
After signing in, you will be redirected to Home.jsx.
Movies are displayed in different categories.

🔹 Movie Banners and Details
A banner image is displayed on every page.
Clicking the Play button plays the corresponding movie trailer.
Clicking More Info expands the movie details.
The banner image changes randomly on page refresh using:
Math.floor(Math.random() * someValue);

Home Page with movie banner<br>
In Web<br>
<img src="https://github.com/anjuvijayan95/netflix-tws-firebase/blob/main/src/assets/img/Home.PNG" width="300px">
In Mobile Browsers<br>
<img src="https://github.com/anjuvijayan95/netflix-tws-firebase/blob/main/src/assets/img/MobileHome.PNG" width="300px">

🔹 Movie Categories
Below the banner, movies are displayed in rows using Flexbox.

Clicking a Navbar item filters movies by category:
Navbar Image<br>
<img src="https://github.com/anjuvijayan95/netflix-tws-firebase/blob/main/src/assets/img/NavBar.PNG" width="300px">

Home → Home.jsx
TV Shows → TVShow.jsx
Kids → Kid.jsx
Movies → Movies.jsx
Popular → Popular.jsx
Example API calls for fetching movies:

const response = await axios.get(requests.requestPopularTV);
const response = await axios.get(requests.requestKidsMovies);
const responses = await Promise.all([
  axios.get(requests.requestUpcoming),
  axios.get(requests.requestPopular),
  axios.get(requests.requestTrending),
  axios.get(requests.requestTopRated),
  axios.get(requests.requestHorror),
]);

🔹Search Bar feature
The search bar in Navbar will help you to filter the movies that you need that is applicable in all above pages

🔹 "My List" Feature 
Hover over a movie to see a heart (❤️) icon.
Clicking the heart saves the movie to "My List".
Saved movies are stored in Firebase Firestore under the logged-in user’s account.
Users can access "My List" only when logged in.

<img src="https://github.com/anjuvijayan95/netflix-tws-firebase/blob/main/src/assets/img/MyShow.PNG" width="300px">

🔹 User Account
Clicking on blueSmile.jpg shows an option to Log Out.

<img src="https://github.com/anjuvijayan95/netflix-tws-firebase/blob/main/src/assets/img/Logout.PNG" width="300px">

🔥 Technologies Used
React (Frontend Framework)
Firebase (Authentication & Firestore)
TMDB API (Movie Data)
Axios (API Requests)
Tailwind CSS (Styling)