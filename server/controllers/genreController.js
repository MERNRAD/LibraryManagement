const mongoose = require('mongoose');
const Genre = require('../models/genre');

const ALLOWED_FIELDS = ['name', 'description'];

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

const validateGenreData = (data, isNew = false) => {
    for (const field of ALLOWED_FIELDS) {
        if (isNew || data[field] !== undefined) {
            if (
                typeof data[field] !== 'string' ||
                !data[field].trim()
            ) {
                return `${ field } es obligatorio y debe ser texto`;
            }
        }
    }

    return null;
};

// Consultar genero por ID
const getGenre = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de genero no valido'
        });
    }

    try {
        const genre = await Genre.findById(id);

        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Genero no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            genre
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo consultar el genero'
        });
    }
};

// Consultar todos los generos
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find({});

        return res.status(200).json({
            success: true,
            genresList: genres
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'No se pudieron consultar los generos'
        });
    }
};

// Crear genero
const addGenre = async (req, res) => {
    const newGenre = getAllowedFields(req.body);

    if (!newGenre) {
        return res.status(400).json({
            success: false,
            message: 'Datos del genero no validos'
        });
    }

    const validationError = validateGenreData(newGenre, true);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    newGenre.name = newGenre.name.trim();
    newGenre.description = newGenre.description.trim();

    try {
        const genre = await Genre.create(newGenre);

        return res.status(200).json({
            success: true,
            newGenre: genre
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo registrar el genero'
        });
    }
};

// Actualizar genero
const updateGenre = async (req, res) => {
    const { id } = req.params;
    const updatedGenre = getAllowedFields(req.body);

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de genero no valido'
        });
    }

    if (!updatedGenre || Object.keys(updatedGenre).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No hay campos validos para actualizar'
        });
    }

    const validationError = validateGenreData(updatedGenre);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    for (const field of ALLOWED_FIELDS) {
        if (updatedGenre[field] !== undefined) {
            updatedGenre[field] = updatedGenre[field].trim();
        }
    }

    try {
        const genre = await Genre.findByIdAndUpdate(
            id,
            { $set: updatedGenre },
            { new: true, runValidators: true }
        );

        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Genero no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            updatedGenre: genre
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo actualizar el genero'
        });
    }
};

// Eliminar genero
const deleteGenre = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de genero no valido'
        });
    }

    try {
        const genre = await Genre.findByIdAndDelete(id);

        if (!genre) {
            return res.status(404).json({
                success: false,
                message: 'Genero no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            deletedGenre: genre
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo eliminar el genero'
        });
    }
};

module.exports = {
    getGenre,
    getAllGenres,
    addGenre,
    updateGenre,
    deleteGenre
};