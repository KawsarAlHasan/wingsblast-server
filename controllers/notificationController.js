const db = require("../config/db");

exports.createNotification = async (req, res) => {
  const { order_id, title, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO order_notifications (order_id, title, message) VALUES (?, ?, ?)",
      [order_id, title, message]
    );

    res.status(200).json({
      success: "true",
      message: "order notification post successfully",
    });

    // Socket.io
    const io = req.app.get("socketio");
    io.emit("receiveNotification", {
      id: result.insertId,
      order_id,
      title,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const [notifications] = await db.execute(
      "SELECT * FROM order_notifications ORDER BY id DESC"
    );

    res.status(200).json({
      success: true,
      message: "get all notification",
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
