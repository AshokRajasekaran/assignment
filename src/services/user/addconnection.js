const db = require("../../utils/database");

const addConnection = async (userId, friendId) => {
  // SQL query to insert two entries for the friendship (bidirectional relationship)
  const query = `INSERT INTO Friends (userId, friendId) VALUES (${userId}, ${friendId}), (${friendId}, ${userId})`;
  await db.run(query);
};

module.exports = addConnection;
