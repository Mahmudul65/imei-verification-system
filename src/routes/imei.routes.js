import { Router } from "express";
import {
  checkIMEI,
  registerIMEI,
  blockIMEI,
  unblockIMEI,
  deleteIMEI,
  getAllIMEIs
} from "../controllers/imei.controller.js";

const router = Router();

// Routes
router.get("/all", getAllIMEIs);
router.post("/check", checkIMEI);
router.post("/register", registerIMEI);
router.post("/block", blockIMEI);
router.post("/unblock", unblockIMEI);
router.delete("/delete", deleteIMEI);

export default router;
