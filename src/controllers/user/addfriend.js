const db = require("../../utils/database");

const addFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    db.run(
      `INSERT INTO Friends (userId, friendId) VALUES (${userId}, ${friendId}), (${friendId}, ${userId})`
    )
      .then((response) => {
        console.log(response);
        res.statusCode = 200;
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({ success: false, error: err });
      });
  };
  
  module.exports = addFriend;