import express from 'express';
import {
  getAllReviews,
  getReviewByTripId,
  createReview,
  deleteReviewByFields,
  deleteAllReviewsByFields
} from '../Controllers/reviewController.js';

const router = express.Router();

router.get('/reviews', getAllReviews);
router.get('/reviews/:tripId', getReviewByTripId);
router.post('/reviews/new', createReview);
router.delete('/reviews/:tripId/:userId', deleteReviewByFields);
router.delete('/reviews/all/:tripId', deleteAllReviewsByFields);

export default router;
