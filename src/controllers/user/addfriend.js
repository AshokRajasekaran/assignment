const { userService } = require("../../services/index");

const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    await userService.addConnection(userId, friendId);
    res.statusCode = 200;
    res.json({
      success: true,
    });
  } catch (err) {}
};

module.exports = addFriend;
