import axios from 'axios';
const TMDB_API_KEY = '31ef9e3c4c97b2fe84b51d60078767b9'
const TMDB_API_ACCESS_TOKEN='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWVmOWUzYzRjOTdiMmZlODRiNTFkNjAwNzg3NjdiOSIsIm5iZiI6MTc0NjYwODU5Ny40Nywic3ViIjoiNjgxYjIxZDViZGQ1OWQ2ZDFmODUwOThkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ze5bgmVq838T4Ri1I4wdtKoTgBFOPT2z0DUFA88lgcE'
export const TMDB_CONFIG={
  
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: TMDB_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`
   }
}

export const getMovies = async ({ query }) => {
  const url = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_CONFIG.API_KEY}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMDB_CONFIG.API_KEY}`;

  try {
    const { data } = await axios.get(url); // ✅ Correct
   
    // console.log("Fetched Movies:", data.results); // ✅ This will now show the array
    return data.results; // ✅ Return the actual array
  } catch (error) {
    throw new Error("Error fetching movies: " + error.message);
  }
};



export const getMoviesWithgenre=async({genreNumber})=>{
  const url=`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${genreNumber}&api_key=${TMDB_CONFIG.API_KEY}`
  try {
    const { data } = await axios.get(url); 
    // console.log("Fetched Movies:", data.results);
    return data.results;
  } catch (error) {
    throw new Error("Error fetching movies: " + error.message);
  }
}



// const options = {
//   method: 'GET',
//   url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWVmOWUzYzRjOTdiMmZlODRiNTFkNjAwNzg3NjdiOSIsIm5iZiI6MTc0NjYwODU5Ny40Nywic3ViIjoiNjgxYjIxZDViZGQ1OWQ2ZDFmODUwOThkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ze5bgmVq838T4Ri1I4wdtKoTgBFOPT2z0DUFA88lgcE'
//   }
// };

// axios
//   .request(options)
//   .then(res => console.log(res.data))
//   .catch(err => console.error(err));