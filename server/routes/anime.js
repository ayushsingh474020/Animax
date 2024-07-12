import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addView, addepisodes, createAnime, favoritAnime, getByCategory, getByTag, getAnimeById, getAnimes, random, search, mostpopular } from "../controllers/animes.js";


const router = express.Router();

//create a anime
router.post("/",verifyToken, createAnime);
//get all animes
router.get("/", getAnimes);
//get anime by id
router.get("/get/:id",getAnimeById)

//add episode to a 
router.post("/episode",verifyToken, addepisodes);

//favorit/unfavorit anime
router.post("/favorit",verifyToken,favoritAnime); 

//add view
router.post("/addview/:id",addView); 


//searches
router.get("/mostpopular", mostpopular)
router.get("/random", random)
router.get("/tags", getByTag)
router.get("/category", getByCategory)
router.get("/search", search)





export default router;