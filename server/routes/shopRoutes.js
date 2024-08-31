import express from "express"
import { getShopDetailsController } from "../controllers/shopControllers.js";

const router = express.Router()


router.get("/shop-dets/:shopId", getShopDetailsController);


export default router;
