import {getToken} from "../controller/authController.js";
import {getLastResearch} from "../controller/profileController.js";
import {Request, Response} from "express";
import express from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({message: "test"});
})


router.get("/token", getToken)
router.get("/search/last", getLastResearch)


export default router