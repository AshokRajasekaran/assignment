const db = require("../../utils/database");

const search = async (req, res) => {
  const query = req.params.query;
  const userId = parseInt(req.params.userId);
  let sqlQuery;

  //   sqlQuery = `SELECT user.id, user.name,
  //   CASE
  //     WHEN friends.friendId IS NOT NULL THEN 1
  //     WHEN friendsOfFriends.friendId IS NOT NULL THEN 2
  //     ELSE 0
  //   END AS connection
  // FROM Users user
  // LEFT JOIN Friends friends ON user.id = friends.friendId AND friends.userId = ${userId}
  // LEFT JOIN Friends friendsOfFriends ON user.id = friendsOfFriends.friendId
  //                     AND friendsOfFriends.userId IN (SELECT friends.friendId FROM Friends friends WHERE friends.userId = ${userId})
  // WHERE user.name LIKE '%${query}%'
  // GROUP BY user.id, user.name
  // LIMIT 20;`;

  // Using Common Table Expression Ref Link: https://builtin.com/data-science/recursive-sql
  sqlQuery = `
    WITH FriendsCircle AS (
        SELECT friendId , 
        1 AS connectionRange
            FROM Friends 
            WHERE userId = ${userId}
                UNION
        SELECT friendsOfFriends.friendId, 
        friends.connectionRange + 1
            FROM Friends friendsOfFriends
            JOIN FriendsCircle friends ON friendsOfFriends.userId = friends.friendId
            WHERE friends.connectionRange < ${
              process.env.FRIENDSHIP_CIRCLE_DEPTH || 1
            }
      )
        SELECT currentUser.id, 
        currentUser.name,
        CASE
        WHEN MIN(friends.connectionRange) IS NOT NULL THEN MIN(friends.connectionRange)
        ELSE 0
        END AS connection
            FROM (
            SELECT id, name FROM Users WHERE id != ${userId} AND name LIKE '${query}%' LIMIT 20
            ) currentUser
            LEFT JOIN FriendsCircle friends ON currentUser.id = friends.friendId
         GROUP BY currentUser.id;`;

  db.all(sqlQuery)
    .then((results) => {
      res.statusCode = 200;
      res.json({
        success: true,
        users: results,
      });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.json({ success: false, error: err });
    });
};

module.exports = search;
