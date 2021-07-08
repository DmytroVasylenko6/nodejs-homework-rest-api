const {
    userRegistration,
    userLogin,
    userLogOut,
    userCurrent
} = require('../services/usersServices')

const registrationController = async (req, res) => {
    const { email, password } = req.body
    await userRegistration(email, password)
    res.json({status: "success"})
}

const loginController = async (req, res) => {
    const { email, password } = req.body
    const token = await userLogin(email, password)
    res.json({status: "success", token})
}

const logoutController = async (req, res) => {
    const userId = req.user._id
    await userLogOut(userId)
    res.json({status: "204 No Content"})
}

const getCurrentUserController = async (req, res) => {
    const userId = req.user._id
    const user = await userCurrent(userId)
    res.json({ status: "success", currentUser: { email: user.email, subscription: user.subscription } })
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    getCurrentUserController
}