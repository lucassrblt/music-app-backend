import {getToken} from "../controller/authController";
import {getPopular} from "../controller/profileController";
import {Request, Response} from "express";
import express from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({message: "test"});
})


router.get("/token", getToken)
router.get("/popular", getPopular)


export default router