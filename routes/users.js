const express = require('express')
const router = express.Router()
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
} = require('../controllers/users')

router.route('/')

    /*
     * @api {get} /user Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
    .get(getAllUsers)

    /*
     * @api {post} /user Create User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
    .post(createUser);

router.route('/:id').get(getUser).patch(updateUser)

module.exports = router