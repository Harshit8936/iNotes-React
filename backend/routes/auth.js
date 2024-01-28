const router = require('express').Router();
const userController = require('../controllers/userController')
const fetchUser = require('../middleware/fetchUser')

router.post('/signup',userController.createUser);
router.post('/signin',userController.signInUser);
router.post('/loggedUser/details',fetchUser,userController.loggedUser);

module.exports = router;