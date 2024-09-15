const express = require("express");
const {
  getAllOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getAllOrder);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
