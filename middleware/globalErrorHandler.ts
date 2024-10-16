import {Response, Request, NextFunction} from "express";
import {AppError} from "../utils/errorHandler.js";

export const globalErrorHandler = (err: AppError, req: Request, res: Response) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}