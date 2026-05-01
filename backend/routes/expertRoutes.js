import express from "express";
import { addExpert, getExperts } from "../controllers/expertController.js";

const router = express.Router();

router.post("/experts", addExpert);
router.get("/experts", getExperts);

export default router;