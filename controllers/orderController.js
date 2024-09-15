const db = require("../config/db");
const { generateAdminToken } = require("../config/adminToken");

// get all order
exports.getAllOrder = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { orderStatus, paymentStatus, orderDate, deliveryDate } = req.query;

    // Base query
    let query = `SELECT * FROM orders WHERE 1=1`;

    // Add filters to the query if they exist
    if (orderStatus) {
      query += ` AND order_status = '${orderStatus}'`;
    }

    if (paymentStatus) {
      query += ` AND payment_status = '${paymentStatus}'`;
    }

    if (orderDate) {
      query += ` AND DATE(created_at) = '${orderDate}'`; // Adjust this line
    }

    if (deliveryDate) {
      query += ` AND DATE(delivery_date) = '${deliveryDate}'`; // Adjust this line as well
    }

    // Execute the query
    const [data] = await db.query(query);

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
        data: data,
      });
    }

    // Return the filtered data
    res.status(200).json({
      success: true,
      message: "get order successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "orderId is requied in params",
      });
    }

    const { order_status } = req.body;
    if (!order_status) {
      return res.status(404).send({
        success: false,
        message: "order_status is requied in body",
      });
    }

    const [resultsData] = await db.query(
      `UPDATE orders SET order_status=? WHERE id =?`,
      [order_status, orderId]
    );

    if (!resultsData) {
      return res.status(403).json({
        success: false,
        error: "Something went wrong",
      });
    }

    res.status(200).send({
      success: true,
      message: "status updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update status",
      error,
    });
  }
};
