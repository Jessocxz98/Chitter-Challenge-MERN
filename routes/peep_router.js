const Router = require('express');
const router = Router();

const { verifyToken } = require('../middleware/auth.js')
const { allPeeps_get, newPeep_post } = require('../controllers/peep_controller.js')

router.get('/get', allPeeps_get);
router.post('/', verifyToken, newPeep_post)

module.exports = router;
