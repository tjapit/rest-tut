const router = require("express").Router();
const usersController = require("../controllers/usersController")

/* home route, get all existing Users and create new User */
router.route("/")
    .get(usersController.getAllUsers)
    .post(usersController.registerUser)

/* route with User ID. Read, Update, and Delete existing User */
router.route("/:userId")
    .get(usersController.getUser)
    .delete(usersController.deleteUser)

/* Login route */
router.route("/login")
    .post(usersController.loginUser)


module.exports = router;
