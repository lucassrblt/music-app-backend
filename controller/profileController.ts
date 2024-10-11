import supabase from "../config/supabase";
import ResonseHandler from "../utils/resonseHandler";
import {NextFunction, Request, Response} from "express";
import {AppError} from "../utils/errorHandler";

export const getPopular = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const response = await supabase.from('popular').select('*')
        const data = new ResonseHandler(response.data, "Popular songs retrieved successfully", true)
        res.json(data)
    }catch (e) {
        next(new AppError('Failed to retrieve token', 500));
    }
}