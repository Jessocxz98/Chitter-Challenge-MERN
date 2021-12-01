const { Router } = require('express');
const router = Router();

const { signup_post, login_post, logout } = require('../controllers/auth_controller')

router.post('/signup', signup_post)
router.post('/login', login_post)
router.post('/logout', logout)


module.exports = router;