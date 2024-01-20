const { userService } = require("../../services/index");
const errorHandler = require("../../utils/error-handler");

// Handler function for searching connection for a user.
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
  } catch (err) {
    errorHandler(res, err);
  }
};

module.exports = search;
