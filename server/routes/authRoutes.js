import express from "express"
import { loginUser, registerUser } from "../controllers/authControllers.js";

// const app = express();
// app.use(express.json());

// app.use(cors());

const router = express.Router();

router.post("/sign-in", loginUser);
router.post("/sign-up", registerUser);

export default router;
