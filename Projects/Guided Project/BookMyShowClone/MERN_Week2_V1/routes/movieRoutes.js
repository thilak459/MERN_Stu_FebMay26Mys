// Handles request related to movie
const express = require("express");
const {authMiddleware} = require("../middleware/authMiddleware");
const {
    getHome,
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();
// Fetching the home page
router.get("/",getHome);
// Fetching the all movies
router.get("/movies",getAllMovies);
// Fetching the movies based on id
router.get("/movies/:id",getMovieById);
// Sends req to create new movie 
router.post("/movies",authMiddleware,roleMiddleware("admin"),addMovie);
// Sends req to Update the existing movie
router.put("/movies/:id",authMiddleware,roleMiddleware("admin"),updateMovie);
// Sends the req Delete the movie
router.delete("/movies/:id",authMiddleware,roleMiddleware("admin"),deleteMovie);

module.exports = router;