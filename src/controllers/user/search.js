const { userService } = require("../../services/index");

const search = async (req, res) => {
  try {
    const query = req.params.query;
    const userId = parseInt(req.params.userId);
    const users = await userService.searchConnections(userId, query);
    res.statusCode = 200;
    res.json({
      success: true,
      users,
    });
  } catch (err) {}
};

module.exports = search;
