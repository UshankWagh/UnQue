import express from "express"
import { getProfileDetailsController, updateProfileDetailsController } from "../controllers/ProfileControllers.js";

const router = express.Router()

router.get("/get-details/:role/:id", getProfileDetailsController);

router.patch("/update-details/:role/:id", updateProfileDetailsController);

export default router;