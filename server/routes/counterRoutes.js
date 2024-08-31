import express from "express"
import { addCounterController, getCounterQueueController, deleteCounterController, getCounterController, getJoinedQsController } from "../controllers/counterControllers.js";

const router = express.Router()


// router.get("/all-shop-counters/:shopId", getShopCountersController);

// router.get("/get/:shopId/:counterNo", getCounterController);

router.get("/get-queue/:shopId/:counterNo", getCounterQueueController);

router.patch("/add-counter/:shopId/:counterNo", addCounterController);

router.patch("/delete-counter/:shopId/:counterNo", deleteCounterController);

router.get("/get-joined-qs/:customerid", getJoinedQsController);

export default router;
