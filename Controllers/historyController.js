import { Console } from 'console';
import firebase from '../firebase.js';
import HistoryItem from '../Models/historyModel.js';

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
const collectionName = "Historia";

/**
 * @swagger
 * tags:
 *   name: HistoryItems
 *   description: API endpoints for managing history items
 */

/**
 * @swagger
 * /api/historyItems:
 *   post:
 *     summary: Create a new history item
 *     tags: [HistoryItems]
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
 *         description: History item created successfully
 *       400:
 *         description: Bad request or validation error
 */

export const createHistoryItem = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, collectionName), data);
      res.status(200).send('historyItem created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
/**
 * @swagger
 * /api/historyItems:
 *   get:
 *     summary: Get all history items
 *     tags: [HistoryItems]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistoryItem'
 *       400:
 *         description: No history items found
 */
export const getHistoryItems = async (req, res, next) => {
    try {
      const historyItems = await getDocs(collection(db, collectionName));
      const historyItemArray = [];
  
      if (historyItems.empty) {
        res.status(400).send('No HistoryItems found');
      } else {
        historyItems.forEach((doc) => {
          const historyItem = new HistoryItem(
            doc.data().TripId,
            doc.data().UserId,
            doc.data().Amount,
            doc.data().Total,
            doc.data().Name ,
            doc.data().Country ,
            doc.data().Description,
            doc.data().dateSold,
            doc.data().startDate ,
            doc.data().endDate,
          );
          historyItemArray.push(historyItem);
        });
  
        res.status(200).send(historyItemArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
/**
 * @swagger
 * /api/historyItems/{userId}:
 *   get:
 *     summary: Get history items by user ID
 *     tags: [HistoryItems]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistoryItem'
 *       400:
 *         description: No history items found for the specified user ID
 *       500:
 *         description: Internal Server Error
 */
export const getHistItemsById = async (req, res, next) => {
  try {
      const Id = req.params.UserId; // Assuming tripId is passed as a query parameter
      console.log(Id);
      // Create a query to find the photo by tripId and url
      const q = query(collection(db, collectionName), where('UserId', '==', Id));
  
      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      const historyItemArray = [];

      if (querySnapshot.empty) {
        res.status(400).send('No HistoryItems found');
      } else {
        querySnapshot.forEach((doc) => {
          const historyItem = new HistoryItem(
            doc.data().TripId,
            doc.data().UserId,
            doc.data().Amount,
            doc.data().Total,
            doc.data().Name ,
            doc.data().Country ,
            doc.data().Description,
            doc.data().dateSold,
            doc.data().startDate ,
            doc.data().endDate,
          );
          historyItemArray.push(historyItem);
        });
        res.status(200).send(historyItemArray);          
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };