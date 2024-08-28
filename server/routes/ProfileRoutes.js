import express from "express"
import { getProfileDetailsController } from "../controllers/ProfileControllers.js";

const router = express.Router()

router.get("/get-details/:role/:id", getProfileDetailsController);

export default router;