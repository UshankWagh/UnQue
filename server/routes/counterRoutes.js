import express from "express"
import { addCounterController, getCounterQueueController, deleteCounterController, getJoinedQsController, JoinQueueController, cancelTicketController, removeTicketController, openCloseQueueController } from "../controllers/counterControllers.js";

const router = express.Router()


// router.get("/all-shop-counters/:shopId", getShopCountersController);



router.patch("/add-counter/:shopName/:shopId/:counterNo", addCounterController);

router.patch("/delete-counter/:shopId/:counterNo", deleteCounterController);

router.get("/get-joined-qs/:filter/:customerid", getJoinedQsController);

router.post("/join-queue", JoinQueueController);

router.post("/cancel-ticket", cancelTicketController);

// Queues

router.get("/get-queue/:shopId/:counterNo", getCounterQueueController);

router.patch("/queue/remove-ticket", removeTicketController);

router.patch("/queue/open-close-queue", openCloseQueueController);

export default router;
