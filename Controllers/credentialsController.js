import * as bcrypt from 'bcryptjs';
import Credentials from '../Models/credentialsModel.js'; // Import your Credentials class
import { getFirestore, collection, doc, updateDoc, deleteDoc, where, query, getDocs, getDoc, addDoc, setDoc } from 'firebase/firestore';
import firebase from '../firebase.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const db = getFirestore(firebase);

const collectionName = 'Credentials'; // Replace with your actual collection name

export const createCredentials = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const hashedPassword = await hashPassword(password);

        // Generate a token (you need to implement your own logic here)
        const token = generateToken();

        const credentials = new Credentials(userId, token, hashedPassword);

        const customDocRef = doc(collection(db, collectionName), userId);
        await setDoc(customDocRef, credentials);

        res.status(200).send('Credentials created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;

}

export async function comparePasswords(plainTextPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  }

const generateToken = () => {
    dotenv.config({path: './.env'});
    const secretKey = process.env.SECRET_KEY;
    const options = {
        expiresIn: '1h',
    };
    const token = jwt.sign(payload, secretKey, options);

    return token;
};


export const getUserCredentials = async (req, res) => {
    try {
        const { userId } = req.params;

        const q = query(collection(db, collectionName), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            const credentialsData = querySnapshot.docs[0].data();
            const credentials = new Credentials(
                credentialsData.userId,
                credentialsData.token,
                credentialsData.password
            );

            res.status(200).send(credentials);
        } else {
            res.status(404).send('Credentials not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteCredentials = async (req, res) => {
    try {
        const { userId } = req.params;

        const q = query(collection(db, collectionName), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            const docToDelete = querySnapshot.docs[0];
            await deleteDoc(doc(db, collectionName, docToDelete.id));

            res.status(200).send('Credentials deleted successfully');
        } else {
            res.status(404).send('Credentials not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateCredentialsPassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body;

        const q = query(collection(db, collectionName), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            const docToUpdate = querySnapshot.docs[0];
            await updateDoc(doc(db, collectionName, docToUpdate.id), { password });

            res.status(200).send('Password updated successfully');
        } else {
            res.status(404).send('Credentials not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateCredentialsToken = async (req, res) => {
    try {
        const { userId } = req.params;
        const { token } = req.body;

        const q = query(collection(db, collectionName), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            const docToUpdate = querySnapshot.docs[0];
            await updateDoc(doc(db, collectionName, docToUpdate.id), { token });

            res.status(200).send('Token updated successfully');
        } else {
            res.status(404).send('Credentials not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

