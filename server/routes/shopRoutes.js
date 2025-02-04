import express from "express"
import { getCitiesController, getShopController, getShopDetailsController, getShopsController, getStatesController } from "../controllers/shopControllers.js";

const router = express.Router()

router.get("/shop-dets/:role/:id", getShopDetailsController);
router.get("/get-states", getStatesController);
router.get("/get-cities/:stateid", getCitiesController);
router.get("/get-shops", getShopsController);
router.get("/get-shop/:shopid", getShopController);

export default router;
