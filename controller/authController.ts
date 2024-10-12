import responseHandler from "../utils/responseHandler.js";
import {NextFunction} from "express";
import {fetchSpotifyToken} from "../config/spotifyService.js";
import {AppError} from "../utils/errorHandler.js";
import {Request, Response} from "express";
import {SpotifyTokenResponse} from "../types/spotify";

export const getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await fetchSpotifyToken()
        const responseData = new responseHandler<SpotifyTokenResponse>(data, "Token retrieved successfully", true)
        res.json(responseData)
    }catch(e){
        next(new AppError('Failed to retrieve token', 500));
    }
}
