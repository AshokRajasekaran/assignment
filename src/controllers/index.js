const express = require("express");
const search = require("./user/search");
const addFriend = require("./user/addfriend");
const unFriend = require("./user/unfriend");

const ApiRouter = express.Router();
ApiRouter.get("/search/:userId/:query", search);
ApiRouter.get("/friend/:userId/:friendId", addFriend);
ApiRouter.get("/unfriend/:userId/:friendId", unFriend);

module.exports.ApiRouter = ApiRouter;
