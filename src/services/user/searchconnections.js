const db = require("../../utils/database");

const searchConnections = async (userId, query) => {
  //   const searchQuery = `SELECT user.id, user.name,
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

  // SQL query to search for connections and calculate the connection range using recursive common table expression (REF: https://builtin.com/data-science/recursive-sql)
  const searchQuery = `WITH FriendsCircle AS (
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
  const users = await db.all(searchQuery);
  return users;
};

module.exports = searchConnections;
