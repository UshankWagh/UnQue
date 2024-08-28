import express from "express"
import { getAddCounterController, getDeleteCounterController, getShopCounterController } from "../controllers/CounterControllers.js";

const router = express.Router()


// router.get("/all-shop-counters/:shopId", getShopCountersController);

router.get("/:shopId/:counterNo", getShopCounterController);

router.patch("/add-counter/:shopId/:counterNo", getAddCounterController);

router.patch("/delete-counter/:shopId/:counterNo", getDeleteCounterController);


export default router;