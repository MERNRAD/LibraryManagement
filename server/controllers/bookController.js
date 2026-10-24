const Book = require('../models/book');
const mongoose = require('mongoose');

const ALLOWED_FIELDS = [
    'name',
    'isbn',
    'authorId',
    'genreId',
    'isAvailable',
    'summary',
    'photoUrl'
];

const isValidId = (id) => {
    return (
        typeof id === 'string' &&
        /^[a-fA-F0-9]{24}$/.test(id)
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

const validateBookData = (data, isNew = false) => {
    if (isNew || data.name !== undefined) {
        if (typeof data.name !== 'string' || !data.name.trim()) {
            return 'El nombre del libro es obligatorio';
        }
    }

    if (isNew || data.isbn !== undefined) {
        if (typeof data.isbn !== 'string' || !data.isbn.trim()) {
            return 'El ISBN es obligatorio';
        }
    }

    if (isNew || data.isAvailable !== undefined) {
        if (typeof data.isAvailable !== 'boolean') {
            return 'isAvailable debe ser booleano';
        }
    }

    for (const field of ['authorId', 'genreId']) {
        if (
            data[field] !== undefined &&
            data[field] !== null &&
            !isValidId(data[field])
        ) {
            return `El campo ${ field } no contiene un ID valido`;
        }
    }

    for (const field of ['summary', 'photoUrl']) {
        if (
            data[field] !== undefined &&
            typeof data[field] !== 'string'
        ) {
            return `El campo ${ field } debe ser texto`;
        }
    }

    return null;
};

// Consultar libro por ID
const getBook = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de libro no valido'
        });
    }

    try {
        const book = await Book.findById(id);

        return res.status(200).json({
            success: true,
            book
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo consultar el libro'
        });
    }
};

// Consultar libros con autor y genero
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.aggregate([
            {
                $lookup: {
                    from: 'authors',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $unwind: {
                    path: '$author',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genreId',
                    foreignField: '_id',
                    as: 'genre'
                }
            },
            {
                $unwind: {
                    path: '$genre',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            booksList: books
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudieron consultar los libros'
        });
    }
};

// Crear libro
const addBook = async (req, res) => {
    const newBook = getAllowedFields(req.body);

    if (!newBook) {
        return res.status(400).json({
            success: false,
            message: 'Datos del libro no validos'
        });
    }

    const validationError = validateBookData(newBook, true);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    newBook.name = newBook.name.trim();
    newBook.isbn = newBook.isbn.trim();

    if (newBook.authorId) {
        newBook.authorId = new mongoose.Types.ObjectId(newBook.authorId);
    }

    if (newBook.genreId) {
        newBook.genreId = new mongoose.Types.ObjectId(newBook.genreId);
    }

    try {
        const book = await Book.create(newBook);

        return res.status(200).json({
            success: true,
            newBook: book
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo registrar el libro'
        });
    }
};

// Actualizar libro
const updateBook = async (req, res) => {
    const { id } = req.params;
    const updatedBook = getAllowedFields(req.body);

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de libro no valido'
        });
    }

    if (!updatedBook || Object.keys(updatedBook).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No hay campos validos para actualizar'
        });
    }

    const validationError = validateBookData(updatedBook);

    if (validationError) {
        return res.status(400).json({
            success: false,
            message: validationError
        });
    }

    if (updatedBook.name !== undefined) {
        updatedBook.name = updatedBook.name.trim();
    }

    if (updatedBook.isbn !== undefined) {
        updatedBook.isbn = updatedBook.isbn.trim();
    }

    for (const field of ['authorId', 'genreId']) {
        if (updatedBook[field]) {
            updatedBook[field] =
                new mongoose.Types.ObjectId(updatedBook[field]);
        }
    }

    try {
        const book = await Book.findByIdAndUpdate(
            id,
            { $set: updatedBook },
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            updatedBook: book
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo actualizar el libro'
        });
    }
};

// Eliminar libro
const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
        return res.status(400).json({
            success: false,
            message: 'ID de libro no valido'
        });
    }

    try {
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Libro no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            deletedBook: book
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'No se pudo eliminar el libro'
        });
    }
};

module.exports = {
    getBook,
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
};