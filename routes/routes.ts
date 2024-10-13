import {getToken} from "../controller/authController.js";
import {getLastResearch} from "../controller/profileController.js";
import {Request, Response} from "express";
import express from "express";
import {getArtistAlbums, getArtistTopTracks, getRelatedArtists} from "../controller/artistController.js";

const router = express.Router();


router.get("/token", getToken)
router.get("/search/last", getLastResearch)
router.get("/artist/albums", getArtistAlbums)
router.get("/artist/related", getRelatedArtists)
router.get("/artist/top-tracks", getArtistTopTracks)


export default router