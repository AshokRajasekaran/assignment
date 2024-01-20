const db = require("../../utils/database");

const unFriend = async (req, res) => {
  const { userId, friendId } = req.params;
  db.run(
    `DELETE FROM Friends WHERE (userId = ${userId} AND friendId = ${friendId}) OR (userId = ${friendId} AND friendId =${userId} )`
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

module.exports = unFriend;
