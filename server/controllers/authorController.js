const mongoose = require('mongoose');
const Author = require('../models/author');

const ALLOWED_FIELDS = ['name', 'description', 'photoUrl'];

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

// Consultar autor por ID
const getAuthor = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de autor no valido'
        });
    }

    try {
        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            author
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo consultar el autor'
        });
    }
};

// Consultar todos los autores
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});

        return res.status(200).json({
            success: true,
            authorsList: authors
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'No se pudieron consultar los autores'
        });
    }
};

// Crear autor
const addAuthor = async (req, res) => {
    const newAuthor = getAllowedFields(req.body);

    if (
        !newAuthor ||
        typeof newAuthor.name !== 'string' ||
        !newAuthor.name.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: 'El nombre del autor es obligatorio'
        });
    }

    newAuthor.name = newAuthor.name.trim();

    if (
        newAuthor.description !== undefined &&
        typeof newAuthor.description !== 'string'
    ) {
        return res.status(400).json({
            success: false,
            message: 'La descripcion debe ser texto'
        });
    }

    if (
        newAuthor.photoUrl !== undefined &&
        typeof newAuthor.photoUrl !== 'string'
    ) {
        return res.status(400).json({
            success: false,
            message: 'La URL de la foto debe ser texto'
        });
    }

    try {
        const author = await Author.create(newAuthor);

        return res.status(200).json({
            success: true,
            newAuthor: author
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo registrar el autor'
        });
    }
};

// Actualizar autor
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const updatedAuthor = getAllowedFields(req.body);

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de autor no valido'
        });
    }

    if (!updatedAuthor || Object.keys(updatedAuthor).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No hay campos validos para actualizar'
        });
    }

    if (updatedAuthor.name !== undefined) {
        if (
            typeof updatedAuthor.name !== 'string' ||
            !updatedAuthor.name.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: 'El nombre del autor no es valido'
            });
        }

        updatedAuthor.name = updatedAuthor.name.trim();
    }

    if (
        updatedAuthor.description !== undefined &&
        typeof updatedAuthor.description !== 'string'
    ) {
        return res.status(400).json({
            success: false,
            message: 'La descripcion debe ser texto'
        });
    }

    if (
        updatedAuthor.photoUrl !== undefined &&
        typeof updatedAuthor.photoUrl !== 'string'
    ) {
        return res.status(400).json({
            success: false,
            message: 'La URL de la foto debe ser texto'
        });
    }

    try {
        const author = await Author.findByIdAndUpdate(
            id,
            { $set: updatedAuthor },
            { new: true, runValidators: true }
        );

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            updatedAuthor: author
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo actualizar el autor'
        });
    }
};

// Eliminar autor
const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de autor no valido'
        });
    }

    try {
        const author = await Author.findByIdAndDelete(id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Autor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            deletedAuthor: author
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo eliminar el autor'
        });
    }
};

module.exports = {
    getAuthor,
    getAllAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
};