jest.mock('../models/book', () => ({
    findById: jest.fn(),
    aggregate: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

const Book = require('../models/book');

const {
    getBook,
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

const createResponse = () => {
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };

    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);

    return res;
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Pruebas unitarias del controlador de libros', () => {
    test('TB-01: consulta un libro por ID', async () => {
        const book = { _id: '123', name: 'Libro de prueba' };
        Book.findById.mockResolvedValue(book);

        const req = { params: { id: '507f1f77bcf86cd799439011' } };
        const res = createResponse();

        await getBook(req, res);

        expect(Book.findById).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, book });
    });

    test('TB-02: maneja un error al consultar un libro', async () => {
        Book.findById.mockRejectedValue(new Error('Database error'));

        const req = { params: { id: '507f1f77bcf86cd799439011' } };
        const res = createResponse();

        await getBook(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'No se pudo consultar el libro'
        });
    });

    test('TB-03: obtiene la lista de libros', async () => {
        const books = [{ _id: '123', name: 'Libro de prueba' }];
        Book.aggregate.mockResolvedValue(books);

        const req = {};
        const res = createResponse();

        await getAllBooks(req, res);

        expect(Book.aggregate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            booksList: books
        });
    });

    test('TB-04: maneja un error al listar libros', async () => {
        Book.aggregate.mockRejectedValue(new Error('Database error'));

        const req = {};
        const res = createResponse();

        await getAllBooks(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'No se pudieron consultar los libros'
        });
    });

    test('TB-05: registra un libro correctamente', async () => {
        const book = {
            _id: '456',
            name: 'Nuevo libro',
            isbn: '9781234567890',
            isAvailable: true
        };

        Book.create.mockResolvedValue(book);

        const req = {
            body: {
                name: 'Nuevo libro',
                isbn: '9781234567890',
                isAvailable: true,
                authorId: '507f1f77bcf86cd799439011',
                genreId: '507f1f77bcf86cd799439012'
            }
        };

        const res = createResponse();

        await addBook(req, res);

        expect(Book.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Nuevo libro',
                isbn: '9781234567890',
                isAvailable: true
            })
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            newBook: book
        });
    });

    test('TB-06: rechaza un libro sin nombre', async () => {
        const req = {
            body: {
                isbn: '9781234567890',
                isAvailable: true
            }
        };

        const res = createResponse();

        await addBook(req, res);

        expect(Book.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'El nombre del libro es obligatorio'
        });
    });

    test('TB-07: actualiza un libro correctamente', async () => {
        const book = { _id: '507f1f77bcf86cd799439011', name: 'Actualizado' };
        Book.findByIdAndUpdate.mockResolvedValue(book);

        const req = {
            params: { id: '507f1f77bcf86cd799439011' },
            body: { name: 'Actualizado' }
        };

        const res = createResponse();

        await updateBook(req, res);

        expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(
            req.params.id,
            { $set: { name: 'Actualizado' } },
            { new: true, runValidators: true }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            updatedBook: book
        });
    });

    test('TB-08: rechaza una actualizacion con ID invalido', async () => {
        const req = {
            params: { id: '123' },
            body: { name: 'Actualizado' }
        };

        const res = createResponse();

        await updateBook(req, res);

        expect(Book.findByIdAndUpdate).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('TB-09: elimina un libro correctamente', async () => {
        const book = { _id: '507f1f77bcf86cd799439011', name: 'Eliminado' };
        Book.findByIdAndDelete.mockResolvedValue(book);

        const req = { params: { id: '507f1f77bcf86cd799439011' } };
        const res = createResponse();

        await deleteBook(req, res);

        expect(Book.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            deletedBook: book
        });
    });

    test('TB-10: responde 404 cuando el libro no existe', async () => {
        Book.findByIdAndDelete.mockResolvedValue(null);

        const req = { params: { id: '507f1f77bcf86cd799439011' } };
        const res = createResponse();

        await deleteBook(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Libro no encontrado'
        });
    });
});