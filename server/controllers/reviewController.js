const Review = require('../models/review')

const getReview = async (req, res) => {
    const reviewId = req.params.id;

    Review.findById(reviewId, (err, review) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            review
        });
    });
}

const getAllReviews = async (req, res) => {
    Review.find({}, (err, reviews)=>{
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            reviewsList: reviews
        });
    })
}

const addReview = async (req, res) => {
    const newReview = req.body

    Review.create(newReview, (err, review) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            newReview: review
        });
    })
}

const updateReview = async (req, res) => {
    const reviewId = req.params.id
    const updatedReview = req.body

    Review.findByIdAndUpdate(reviewId,updatedReview, (err, review) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedReview: review
        });
    })
}

const deleteReview = async (req, res) => {
    const reviewId = req.params.id

    Review.findByIdAndDelete(reviewId, (err, review) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            deletedReview: review
        });
    })
}

module.exports = {
    getReview,
    getAllReviews,
    addReview,
    updateReview,
    deleteReview
}
