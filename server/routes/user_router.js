const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth_controller')

router.post('/new', authController.signup_post)
router.post('/login', authController.login_post)

module.exports = router;