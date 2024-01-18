import { getFirestore, getDocs, query, where, collection, doc, addDoc, updateDoc, deleteDoc,  } from 'firebase/firestore';
import User from '../Models/userModel.js';
import firebase from '../firebase.js';
const db = getFirestore(firebase);

const collectionName = "Users";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         Uid:
 *           type: string
 *         Imie:
 *           type: string
 *         Nazwisko:
 *           type: string
 *         Email:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *         isManager:
 *           type: boolean
 *         Ban:
 *           type: boolean
 *
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Successful response with an array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User created successfully
 *
 * /api/users/{uid}:
 *   put:
 *     summary: Update a user by UID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: UID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *
 *   delete:
 *     summary: Delete a user by UID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: UID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */

export const getUsers = async (req, res, next) => {
  try {
    const users = await getDocs(collection(db, collectionName));
    const userArray = [];

    if (users.empty) {
      res.status(400).send('No Users found');
    } else {
      users.forEach((userDoc) => {
        const user = new User(
          userDoc.data().Uid,
          userDoc.data().Imie,
          userDoc.data().Nazwisko,
          userDoc.data().Email,
          userDoc.data().isAdmin,
          userDoc.data().isManager,
          userDoc.data().Ban
        );
        userArray.push(user);
      });

      res.status(200).send(userArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, collectionName), data);
    res.status(200).send('User created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const uid = req.params.uid; // Assuming Uid is passed as a parameter
    const user = req.body;
    await updateDoc(doc(db, collectionName, uid), user);
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const uid = req.params.uid; // Assuming Uid is passed as a parameter
    await deleteDoc(doc(db, collectionName, uid));
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// You can add more operations as needed based on your requirements.
