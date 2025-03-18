const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsersByCity
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/search", searchUsersByCity);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;