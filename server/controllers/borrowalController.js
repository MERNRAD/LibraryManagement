const Borrowal = require('../models/borrowal')
const mongoose = require("mongoose");
const Book = require("../models/book");

const getBorrowal = async (req, res) => {
    const borrowalId = req.params.id;

    Borrowal.findById(borrowalId, (err, borrowal) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            borrowal
        });
    });
}

const getAllBorrowals = async (req, res) => {
    Borrowal.aggregate([{
        $lookup: {
            from: "users",
            localField: "memberId",
            foreignField: "_id",
            as: "member"
        },
    },
        {
            $unwind: "$member"
        },
        {
            $lookup: {
                from: "books",
                localField: "bookId",
                foreignField: "_id",
                as: "book"
            },
        },
        {
            $unwind: "$book"
        },]).exec((err, borrowals) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }

        return res.status(200).json({
            success: true,
            borrowalsList: borrowals
        });
    })
}

const addBorrowal = async (req, res) => {
    const newBorrowal = {
        ...req.body,
        memberId: mongoose.Types.ObjectId(req.body.memberId),
        bookId: mongoose.Types.ObjectId(req.body.bookId)
    }

    Borrowal.create(newBorrowal, (err, borrowal) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }

        Book.findByIdAndUpdate(newBorrowal.bookId, {isAvailable: false}, (err, book) => {
            if (err) {
                return res.status(400).json({success: false, err});
            }

            return res.status(200).json({
                success: true,
                newBorrowal: borrowal
            });
        });
    })
}

const updateBorrowal = async (req, res) => {
    const borrowalId = req.params.id
    const updatedBorrowal = req.body

    Borrowal.findByIdAndUpdate(borrowalId,updatedBorrowal, (err, borrowal) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedBorrowal: borrowal
        });
    })
}

const deleteBorrowal = async (req, res) => {
    const borrowalId = req.params.id

    Borrowal.findByIdAndDelete(borrowalId, (err, borrowal) => {
        if (err) {
            return res.status(400).json({success: false, err});
        }

        Book.findByIdAndUpdate(borrowal.bookId, {isAvailable: true}, (err, book) => {
            if (err) {
                return res.status(400).json({success: false, err});
            }

            return res.status(200).json({
                success: true,
                deletedBorrowal: borrowal
            });
        });
    })
}

module.exports = {
    getBorrowal,
    getAllBorrowals,
    addBorrowal,
    updateBorrowal,
    deleteBorrowal
}
