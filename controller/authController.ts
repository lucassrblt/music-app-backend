import responseDto from "../utils/resonseHandler";
import {NextFunction} from "express";
import {fetchSpotifyToken} from "../config/spotifyService";
import {AppError} from "../utils/errorHandler";
import {Request, Response} from "express";
import {SpotifyTokenResponse} from "../types/spotify";

export const getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await fetchSpotifyToken()
        const responseData = new responseDto<SpotifyTokenResponse>(data, "Token retrieved successfully", true)
        res.json(responseData)
    }catch(e){
        next(new AppError('Failed to retrieve token', 500));
    }
}
