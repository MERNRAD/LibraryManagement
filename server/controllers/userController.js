const User = require('../models/user')

const getUser = async (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            user
        });
    });
}

const getAllUsers = async (req, res) => {
    User.find({}, (err, users)=>{
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            usersList: users
        });
    })
}

const addUser = async (req, res) => {
    const newUser = req.body

    User.create(newUser, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            newUser: user
        });
    })
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const updatedUser = req.body

    User.findByIdAndUpdate(userId,updatedUser, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedUser: user
        });
    })
}

const deleteUser = async (req, res) => {
    const userId = req.params.id

    User.findByIdAndDelete(userId, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            deletedUser: user
        });
    })
}

module.exports = {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}
