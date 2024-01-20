const { userService } = require("../../services/index");

const unFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    await userService.removeConnection(userId, friendId);
    res.statusCode = 200;
    res.json({
      success: true,
    });
  } catch (err) {}
};

module.exports = unFriend;
