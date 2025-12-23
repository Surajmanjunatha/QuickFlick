import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

/**
 * GET: Now Playing Movies (via TMDB Proxy)
 * Route: GET /api/show/now-playing
 */
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.TMDB_PROXY_URL}/tmdb/movie/now_playing`
    );

    res.json({
      success: true,
      movies: data.results
    });
  } catch (error) {
    console.error("Now Playing Error:", error.message);
    res.json({
      success: false,
      message: error.message
    });
  }
};

/**
 * POST: Add Show + Movie
 * Route: POST /api/show/add
 */
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    // Basic validation
    if (!movieId || !showsInput?.length || !showPrice) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data"
      });
    }

    // Check if movie already exists
    let movie = await Movie.findById(movieId);

    // If movie does not exist → fetch from TMDB via proxy
    if (!movie) {
      const [movieDetailsRes, movieCreditsRes] = await Promise.all([
        axios.get(`${process.env.TMDB_PROXY_URL}/tmdb/movie/${movieId}`),
        axios.get(`${process.env.TMDB_PROXY_URL}/tmdb/movie/${movieId}/credits`)
      ]);

      const movieData = movieDetailsRes.data;
      const creditsData = movieCreditsRes.data;

      movie = await Movie.create({
        _id: movieId,
        title: movieData.title,
        overview: movieData.overview,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path,
        genres: movieData.genres,
        casts: creditsData.cast,
        release_date: movieData.release_date,
        original_language: movieData.original_language,
        tagline: movieData.tagline || "",
        vote_average: movieData.vote_average,
        runtime: movieData.runtime
      });
    }

    // Prepare shows
    const showsToCreate = [];

    showsInput.forEach(show => {
      show.time.forEach(time => {
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(`${show.date}T${time}`),
          showPrice,
          occupiedSeats: {}
        });
      });
    });

    // Optional: prevent duplicate shows
    await Show.deleteMany({
      movie: movieId,
      showDateTime: { $in: showsToCreate.map(s => s.showDateTime) }
    });

    // Insert new shows
    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({
      success: true,
      message: "Shows Added Successfully"
    });

  } catch (error) {
    console.error("Add Show Error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// API to get all shows from the database
// API to get all shows (unique movies)
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({})
      .populate("movie")
      .sort({ showDateTime: 1 });

    const movieMap = new Map();

    shows.forEach(show => {
      if (show.movie && !movieMap.has(show.movie._id.toString())) {
        movieMap.set(show.movie._id.toString(), show.movie);
      }
    });

    res.json({
      success: true,
      shows: Array.from(movieMap.values())
    });

  } catch (error) {
    console.error("Get Shows Error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// API to get a single show from the database
export const getShow = async (req, res) => {
     try {
          const {movieId} = req.params;
          //get all upcoming shows for the movie
          const shows = await Show.find({movie: movieId, showDateTime: { $gte: new Date() }})

          const movie = await Movie.findById(movieId)
          const dateTime = {};

          shows.forEach((show) =>{
               const date = show.showDateTime.toISOString().split("T")[0];
               if(!dateTime[date]){
                    dateTime[date] = []
               }
               dateTime[date].push({time: show.showDateTime, showId: show._id })
          })
          res.json({success: true, movie, dateTime})
     } catch (error) {
          console.log(error)
          res.json({success: false, message: error.message});
     }
}