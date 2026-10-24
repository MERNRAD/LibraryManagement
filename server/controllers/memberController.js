
const mongoose = require('mongoose');
const Member = require('../models/member');

const ALLOWED_FIELDS = [
    'memberName',
    'address',
    'occupation',
    'nic',
    'phone',
    'status',
    'email',
    'photoUrl'
];

const isValidId = (id) => {
    return (
        typeof id === 'string' &&
        mongoose.Types.ObjectId.isValid(id) &&
        String(new mongoose.Types.ObjectId(id)) === id
    );
};

const getAllowedFields = (body) => {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return null;
    }

    const data = {};

    for (const field of ALLOWED_FIELDS) {
        if (Object.prototype.hasOwnProperty.call(body, field)) {
            data[field] = body[field];
        }
    }

    return data;
};

const validateMemberData = (data, isNew = false) => {
    if (
        isNew &&
        (typeof data.memberName !== 'string' || !data.memberName.trim())
    ) {
        return 'memberName es obligatorio';
    }

    if (
        isNew &&
        (data.nic === undefined || data.nic === null || data.nic === '')
    ) {
        return 'nic es obligatorio';
    }

    if (
        isNew &&
        (data.phone === undefined || data.phone === null || data.phone === '')
    ) {
        return 'phone es obligatorio';
    }

    if (
        data.memberName !== undefined &&
        (typeof data.memberName !== 'string' || !data.memberName.trim())
    ) {
        return 'memberName debe ser texto';
    }

    for (const field of ['address', 'occupation', 'status', 'email', 'photoUrl']) {
        if (data[field] !== undefined && typeof data[field] !== 'string') {
            return `${field} debe ser texto`;
        }
    }

    for (const field of ['nic', 'phone']) {
        if (
            data[field] !== undefined &&
            (!Number.isSafeInteger(Number(data[field])) ||
                data[field] === '' ||
                data[field] === null)
        ) {
            return `${field} debe ser un numero entero valido`;
        }

        if (data[field] !== undefined) {
            data[field] = Number(data[field]);
        }
    }

    if (
        data.email !== undefined &&
        data.email.trim() !== '' &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    ) {
        return 'Correo electronico no valido';
    }

    return null;
};

// Consultar miembro por ID
const getMember = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de miembro no valido'
        });
    }

    try {
        const member = await Member.findById(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Miembro no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            member
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al consultar el miembro'
        });
    }
};

// Consultar todos los miembros
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find({});

        return res.status(200).json({
            success: true,
            membersList: members
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al consultar los miembros'
        });
    }
};

// Registrar miembro
const addMember = async (req, res) => {
    const newMember = getAllowedFields(req.body);

    if (!newMember) {
        return res.status(400).json({
            success: false,
            message: 'Datos de miembro no validos'
        });
    }

    const validationError = validateMemberData(newMember, true);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    if (typeof newMember.memberName === 'string') {
        newMember.memberName = newMember.memberName.trim();
    }

    if (typeof newMember.email === 'string') {
        newMember.email = newMember.email.trim().toLowerCase();
    }

    try {
        const member = await Member.create(newMember);

        return res.status(200).json({
            success: true,
            newMember: member
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo registrar el miembro'
        });
    }
};

// Actualizar miembro
const updateMember = async (req, res) => {
    const { id } = req.params;
    const updatedMember = getAllowedFields(req.body);

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de miembro no valido'
        });
    }

    if (!updatedMember || Object.keys(updatedMember).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No hay campos validos para actualizar'
        });
    }

    const validationError = validateMemberData(updatedMember);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    if (typeof updatedMember.memberName === 'string') {
        updatedMember.memberName = updatedMember.memberName.trim();
    }

    if (typeof updatedMember.email === 'string') {
        updatedMember.email = updatedMember.email.trim().toLowerCase();
    }

    try {
        const member = await Member.findByIdAndUpdate(
            id,
            { $set: updatedMember },
            { new: true, runValidators: true }
        );

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Miembro no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            updatedMember: member
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo actualizar el miembro'
        });
    }
};

// Eliminar miembro
const deleteMember = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de miembro no valido'
        });
    }

    try {
        const member = await Member.findByIdAndDelete(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Miembro no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            deletedMember: member
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el miembro'
        });
    }
};

module.exports = {
    getMember,
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
};
