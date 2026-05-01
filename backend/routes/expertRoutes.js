import express from "express";
import { getExperts, createExpert } from "../controllers/expertController.js";

const router = express.Router();

router.get("/experts", getExperts);
router.post("/experts", createExpert);

export default router;