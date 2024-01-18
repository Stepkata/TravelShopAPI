import firebase from '../firebase.js';
import Photo from '../Models/photoModel.js';

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

const db = getFirestore(firebase);
const collectionName = "Zdjecia";
/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: API endpoints for managing photos
 */

/**
 * @swagger
 * /api/photos:
 *   post:
 *     summary: Create a new photo
 *     tags: [Photos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripId:
 *                 type: number
 *               url:
 *                 type: string
 *               thumbnail:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Photo created successfully
 *       400:
 *         description: Bad request or validation error
 */
export const createPhoto = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, collectionName), data);
      res.status(200).send('photo created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
/**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Get all photos
 *     tags: [Photos]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 *       400:
 *         description: No photos found
 */
export const getPhotos = async (req, res, next) => {
    try {
      const photos = await getDocs(collection(db, collectionName));
      const photoArray = [];
  
      if (photos.empty) {
        res.status(400).send('No Photos found');
      } else {
        photos.forEach((doc) => {
          const photo = new Photo(
            doc.data().tripId,
            doc.data().url,
            doc.data().thumbnail,
          );
          photoArray.push(photo);
        });
  
        res.status(200).send(photoArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

/**
 * @swagger
 * /api/photos/{tripId}/{url}:
 *   delete:
 *     summary: Delete a photo by tripId and url
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       404:
 *         description: Photo not found
 *       500:
 *         description: Internal Server Error
 */

export const deletePhoto = async (req, res, next) => {
    try {
        const tripId = req.params.tripId; // Assuming tripId is passed as a query parameter
    
        // Create a query to find the photo by tripId and url
        const q = query(collection(db, collectionName), where('tripId', '==', parseInt(tripId)));
        console.log(tripId);
    
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
    
        // Check if any documents were found
        if (!querySnapshot.empty) {
          // Retrieve the first document found
          for (const docToDelete of querySnapshot.docs)
            await deleteDoc(doc(db, collectionName, docToDelete.id));
    
          res.status(200).send('Photo deleted successfully');
        } else {
          res.status(404).send('Photo not found');
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
  };
