import { getFirestore, query, collection, where, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import firebase from '../firebase.js';
import Review from '../Models/reviewModel.js'
const db = getFirestore(firebase);
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for managing reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: No reviews found
 *       500:
 *         description: Internal Server Error
 */
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await getDocs(collection(db, 'Recenzje'));
    const reviewArray = [];

    if (reviews.empty) {
      res.status(400).send('No Reviews found');
    } else {
      reviews.forEach((doc) => {
        const review = new Review(
          doc.data().tripId,
          doc.data().userId,
          doc.data().nick,
          doc.data().name,
          doc.data().rating,
          doc.data().reviewText,
          doc.data().purchaseDate
        );
        reviewArray.push(review);
      });

      res.status(200).send(reviewArray);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
/**
 * @swagger
 * /api/reviews/{tripId}:
 *   get:
 *     summary: Get reviews by tripId
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reviews not found for the specified tripId
 *       500:
 *         description: Internal Server Error
 */

export const getReviewByTripId = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;

    const q = query(collection(db, 'Recenzje'), where('tripId', '==', parseInt(tripId)));

    const querySnapshot = await getDocs(q);

    const reviewArray = [];

    if (querySnapshot.empty) {
      res.status(404).send('No Reviews found for the specified tripId');
    } else {
      querySnapshot.forEach((doc) => {
        const review = new Review(
          doc.data().tripId,
          doc.data().userId,
          doc.data().nick,
          doc.data().name,
          doc.data().rating,
          doc.data().reviewText,
          doc.data().purchaseDate
        );
        reviewArray.push(review);
      });

      res.status(200).send(reviewArray);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review created successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal Server Error
 */
export const createReview = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'Recenzje'), data);
    res.status(200).send('Review created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
/**
 * @swagger
 * /api/reviews/{tripId}/{userId}:
 *   delete:
 *     summary: Delete a review by tripId and userId
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found for the specified tripId and userId
 *       500:
 *         description: Internal Server Error
 */
export const deleteReviewByFields = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const userId = req.params.userId;

    const q = query(
      collection(db, 'Recenzje'),
      where('tripId', '==', parseInt(tripId)),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'Recenzje', docToDelete.id));
      res.status(200).send('Review deleted successfully');
    } else {
      res.status(404).send('Review not found for the specified tripId and userId');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteAllReviewsByFields = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;

    const q = query(
      collection(db, 'Recenzje'),
      where('tripId', '==', parseInt(tripId)),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      
      for (const docToDelete of  querySnapshot.docs){
        await deleteDoc(doc(db, 'Recenzje', docToDelete.id));
      }
      res.status(200).send('Review deleted successfully');
    } else {
      res.status(404).send('Review not found for the specified tripId and userId');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

