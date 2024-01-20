const db = require("../../utils/database");

const removeConnection = async (userId, friendId) => {
  // SQL query to delete entries for the specified friendship (bidirectional relationship)
  const query = `DELETE FROM Friends WHERE (userId = ${userId} AND friendId = ${friendId}) OR (userId = ${friendId} AND friendId =${userId} )`;
  await db.run(query);
};

module.exports = removeConnection;
