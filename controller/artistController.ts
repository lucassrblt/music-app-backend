import {NextFunction, Request, Response} from "express";
import {AppError} from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import {fetchArtists, fetchArtistsAlbum, fetchArtistTopTracks, fetchRelatedArtists} from "../config/spotifyService.js";

export const getRelatedArtists = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
        if(!token) return next(new AppError("Missing bearer token", 401));

        const id = typeof req.query.id === 'string' ? req.query.id : '';
        if(!id) return next(new AppError("Error on request param", 500))

        const data = await fetchRelatedArtists(token, id)
        const response = new responseHandler<[]>(data, "Related Artists fetched", true)
        res.json(response)

    }catch (e) {
        next(new AppError("Something went wrong", 500))
    }
}

export const getArtistAlbums = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
        if(!token) return next(new AppError("Missing bearer token", 401));

        const id = typeof req.query.id === 'string' ? req.query.id : '';
        if(!id) return next(new AppError("Error on request param", 500))

        const data = await fetchArtistsAlbum(token, id)
        const response = new responseHandler<[]>(data, "Albums Artist fetched", true)
        res.json(response)
    }catch (e) {
        next(new AppError("Something went wrong", 500))

    }
}

export const getArtistTopTracks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
        if(!token) return next(new AppError("Missing bearer token", 401));

        const id = typeof req.query.id === 'string' ? req.query.id : '';
        if(!id) return next(new AppError("Error on request param", 500))

        const data = await fetchArtistTopTracks(token, id)
        const response = new responseHandler<[]>(data, "Artist Top Tracks", true)
        res.json(response)
    }catch (e) {
        next(new AppError("Something went wrong", 500))
    }
}