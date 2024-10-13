import supabase from "../config/supabase.js";
import ResponseHandler from "../utils/responseHandler.js";
import {NextFunction, Request, Response} from "express";
import {AppError} from "../utils/errorHandler.js";
import {fetchArtists, fetchPlaylist} from "../config/spotifyService.js";

export const getLastResearch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let data = new ResponseHandler<[]>([], "No last research found", true);
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
        if(!token) return next(new AppError('Missing Bearer Token', 401));

        const supabaseResponse = await supabase.from('last_research').select('*').order('id', {ascending: false}).limit(15)
        if (supabaseResponse.data && supabaseResponse.data.length > 0) {
            const artists = supabaseResponse.data.map((artist: any) => artist.artist_id)
            const spotifyResponse = await fetchArtists(token, artists)
            data = new ResponseHandler<any>(spotifyResponse.artists, "Last research retrieve successfully", true)
        }

        res.json(data)
    } catch (e) {
        next(new AppError('Something went wrong', 500));
    }
}


export const getPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
        if(!token) return next(new AppError('Missing Bearer Token', 401));

        const keyword = typeof req.query.keyword === 'string' ? req.query.keyword : "";
        if(!keyword) return next(new AppError("Missing playlist keyword", 500))

        const response = await fetchPlaylist(token, keyword)
        const data = new ResponseHandler<any>(response, "Playlist value", true)
        res.json(data)
    }catch (e) {
        next(new AppError('Something went wrong', 500))
    }
}