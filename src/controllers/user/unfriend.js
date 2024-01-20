const { userService } = require("../../services/index");
const errorHandler = require("../../utils/error-handler");

// Handler function to remove a friend from connection.
const unFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    await userService.removeConnection(userId, friendId);
    res.statusCode = 200;
    res.json({
      success: true,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = unFriend;
