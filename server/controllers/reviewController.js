const mongoose = require('mongoose');
const Review = require('../models/review');

const ALLOWED_FIELDS = ['bookID', 'star', 'rating'];

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

const validateReviewData = (data, isNew = false) => {
    if (
        isNew &&
        (typeof data.bookID !== 'string' || !isValidId(data.bookID))
    ) {
        return 'bookID debe ser un ID valido';
    }

    if (data.bookID !== undefined && !isValidId(data.bookID)) {
        return 'bookID debe ser un ID valido';
    }

    if (
        isNew &&
        (typeof data.star !== 'string' || !data.star.trim())
    ) {
        return 'star es obligatorio';
    }

    if (
        data.star !== undefined &&
        (typeof data.star !== 'string' || !data.star.trim())
    ) {
        return 'star debe ser texto no vacio';
    }

    if (data.rating !== undefined && typeof data.rating !== 'string') {
        return 'rating debe ser texto';
    }

    return null;
};

// Consultar resena por ID
const getReview = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de resena no valido'
        });
    }

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Resena no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            review
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al consultar la resena'
        });
    }
};

// Consultar todas las resenas
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});

        return res.status(200).json({
            success: true,
            reviewsList: reviews
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al consultar las resenas'
        });
    }
};

// Crear resena
const addReview = async (req, res) => {
    const newReview = getAllowedFields(req.body);

    if (!newReview) {
        return res.status(400).json({
            success: false,
            message: 'Datos de resena no validos'
        });
    }

    const validationError = validateReviewData(newReview, true);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    try {
        const reviewData = {
            ...newReview,
            bookID: new mongoose.Types.ObjectId(newReview.bookID),
            star: newReview.star.trim()
        };

        if (typeof reviewData.rating === 'string') {
            reviewData.rating = reviewData.rating.trim();
        }

        const review = await Review.create(reviewData);

        return res.status(200).json({
            success: true,
            newReview: review
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo registrar la resena'
        });
    }
};

// Actualizar resena
const updateReview = async (req, res) => {
    const { id } = req.params;
    const updatedReview = getAllowedFields(req.body);

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de resena no valido'
        });
    }

    if (!updatedReview || Object.keys(updatedReview).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No hay campos validos para actualizar'
        });
    }

    const validationError = validateReviewData(updatedReview);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    if (updatedReview.bookID !== undefined) {
        updatedReview.bookID = new mongoose.Types.ObjectId(
            updatedReview.bookID
        );
    }

    if (typeof updatedReview.star === 'string') {
        updatedReview.star = updatedReview.star.trim();
    }

    if (typeof updatedReview.rating === 'string') {
        updatedReview.rating = updatedReview.rating.trim();
    }

    try {
        const review = await Review.findByIdAndUpdate(
            id,
            { $set: updatedReview },
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Resena no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            updatedReview: review
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo actualizar la resena'
        });
    }
};

// Eliminar resena
const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de resena no valido'
        });
    }

    try {
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Resena no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            deletedReview: review
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la resena'
        });
    }
};

module.exports = {
    getReview,
    getAllReviews,
    addReview,
    updateReview,
    deleteReview
};
