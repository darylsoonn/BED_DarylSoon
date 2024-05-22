const User = require("../models/user");

async function getUsersWithBooks(req, res) {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
}

// ... other functions ...

module.exports = {
  // ... other exports ...
  getUsersWithBooks,
};