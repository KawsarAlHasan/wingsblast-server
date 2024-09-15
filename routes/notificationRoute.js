const express = require("express");
const {
  createNotification,
  getNotifications,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/notifications", createNotification);
router.get("/notifications", getNotifications);

module.exports = router;
