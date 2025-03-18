const User = require("../models/user");
const logger = require("../config/logger");

const validateAddresses = (addresses) => {
  if (!Array.isArray(addresses)) {
    return { error: "The 'addresses' field must be an array." };
  }

  for (let address of addresses) {
    if (
      !address.street ||
      typeof address.street !== "string" ||
      !address.city ||
      typeof address.city !== "string" ||
      !address.country ||
      typeof address.country !== "string" ||
      !address.postal_code ||
      typeof address.postal_code !== "string"
    ) {
      return { error: "Each address must be an object with valid fields (street, city, country, postal_code)." };
    }
  }

  return null;
};

const createUser = async (req, res) => {
  try {
    const { name, email, addresses } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const addressValidation = validateAddresses(addresses);
    if (addressValidation && addressValidation.error) {
      return res.status(400).json({ message: addressValidation.error });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const validatePaginationParams = (page, limit) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;

  if (pageNum <= 0 || limitNum <= 0) {
    return { error: "Page and limit must be positive integers" };
  }

  return { pageNum, limitNum };
};

const getUsers = async (req, res) => {
  try {
    const { page, limit, sortBy } = req.query;
    const { pageNum, limitNum, error } = validatePaginationParams(page, limit);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const skip = (pageNum - 1) * limitNum;
    const sortCriteria = sortBy ? { [sortBy]: 1 } : { name: 1 };

    const users = await User.find()
                            .skip(skip)
                            .limit(limitNum)
                            .sort(sortCriteria);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limitNum);

    res.json({
      currentPage: pageNum,
      totalPages: totalPages,
      totalUsers: totalUsers,
      users: users
    });
  } catch (error) {
    logger.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    logger.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    logger.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    logger.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

const searchUsersByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: "You must provide a city as a query parameter" });
    }

    const users = await User.find({ "addresses.city": city });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found in this city" });
    }

    res.json(users);
  } catch (error) {
    logger.error("Error searching users by city:", error);
    res.status(500).json({ message: "Error searching users" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsersByCity
};
