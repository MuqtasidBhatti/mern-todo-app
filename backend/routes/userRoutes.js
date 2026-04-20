const express = require('express')
const { loginUser, registerUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const User = require('../models/User')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user).select('-password')
  res.json({ message: "Protected route", user});
});

module.exports = router