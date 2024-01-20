const { userService } = require("../../services/index");
const errorHandler = require("../../utils/error-handler");

// Handler function for adding a friend
const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    await userService.addConnection(userId, friendId);
    res.statusCode = 200;
    res.json({
      success: true,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = addFriend;
