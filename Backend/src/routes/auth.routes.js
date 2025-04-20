const express = require('express');
const router = express.Router();
const { register, login,getAllUsers } = require('../controllers/auth.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/getAll', getAllUsers)


router.get('/admin-only', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: `Hello Admin ${req.user.email}` });
});


module.exports = router;
