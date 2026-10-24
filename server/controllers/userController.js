const mongoose = require('mongoose');
const User = require('../models/user');

const isValidEmail = (email) => {
    return (
        typeof email === 'string' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    );
};

const isValidId = (id) => {
    return (
        typeof id === 'string' &&
        mongoose.Types.ObjectId.isValid(id) &&
        String(new mongoose.Types.ObjectId(id)) === id
    );
};

const getUser = async (req, res) => {
    const userId = req.params.id;

    if (!isValidId(userId)) {
        return res.status(400).json({
            success: false,
            message: 'ID de usuario no valido'
        });
    }

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    });
};

const getAllUsers = async (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            usersList: users
        });
    });
};

const getAllMembers = async (req, res) => {
    User.find({ isAdmin: false }, (err, members) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            membersList: members
        });
    });
};

const addUser = async (req, res) => {
    const { email, password } = req.body || {};

    if (
        !isValidEmail(email) ||
        typeof password !== 'string' ||
        password.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'Correo o contrasena no validos'
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    User.findOne({ email: normalizedEmail }, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al consultar el usuario'
            });
        }

        if (user) {
            return res.status(403).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Solo se aceptan campos definidos expresamente.
        const newUser = new User({
            email: normalizedEmail,
            isAdmin: false
        });

        newUser.setPassword(password);

        newUser.save((saveErr, savedUser) => {
            if (saveErr) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo registrar el usuario'
                });
            }

            return res.status(201).json({
                success: true,
                user: savedUser
            });
        });
    });
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { email, password } = req.body || {};

    if (!isValidId(userId)) {
        return res.status(400).json({
            success: false,
            message: 'ID de usuario no valido'
        });
    }

    const updates = {};

    if (email !== undefined) {
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Correo no valido'
            });
        }

        updates.email = email.trim().toLowerCase();
    }

    if (password !== undefined) {
        if (typeof password !== 'string' || password.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Contrasena no valida'
            });
        }

        return User.findById(userId, (findErr, user) => {
            if (findErr) {
                return res.status(400).json({
                    success: false,
                    message: 'Error al consultar el usuario'
                });
            }

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            if (updates.email !== undefined) {
                user.email = updates.email;
            }

            user.setPassword(password);

            user.save((saveErr, savedUser) => {
                if (saveErr) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se pudo actualizar el usuario'

                    });

                }

                return res.status(200).json({
                    success: true,
                    updatedUser: savedUser
                });
            });
        });
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No hay campos validos para actualizar'
        });
    }

    User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Error al actualizar el usuario'
                });
            }

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                updatedUser: user

            });

        }

    );
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (!isValidId(userId)) {
        return res.status(400).json({
            success: false,
            message: 'ID de usuario no valido'
        });
    }

    User.findByIdAndDelete(userId, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            deletedUser: user
        });
    });
};

module.exports = {
    getUser,
    getAllUsers,
    getAllMembers,
    addUser,
    updateUser,
    deleteUser
};
