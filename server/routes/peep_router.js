const Router = require('express');
const router = Router();

const peepController = require('../controllers/peep_controller')

router.get('/', peepController.allPeeps_get);
router.post('/new', peepController.newPeep_post)

module.exports = router;
