import Wycieczka from '../Models/tripModel.js'; // Adjust the path accordingly
import { getFirestore, collection, doc, updateDoc, deleteDoc, where, query, getDocs, getDoc, addDoc, setDoc } from 'firebase/firestore';
import firebase from '../firebase.js';
const db = getFirestore(firebase); // Assuming you have already initialized firebase

const collectionName = 'Wycieczka'; // Adjust the collection name accordingly

/**
 * @swagger
 * components:
 *   schemas:
 *     Wycieczka:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *         Nazwa:
 *           type: string
 *         Kraj:
 *           type: string
 *         DataRozpoczecia:
 *           type: string
 *           format: date
 *         DataZakonczenia:
 *           type: string
 *           format: date
 *         CenaJednostkowa:
 *           type: number
 *         MaxIloscMiejsc:
 *           type: number
 *         IloscMiejsc:
 *           type: number
 *         Opis:
 *           type: string
 *         DlugiOpis:
 *           type: string
 *         Ocena:
 *           type: number
 *
 * /api/wycieczki:
 *   get:
 *     summary: Get all wycieczki
 *     responses:
 *       '200':
 *         description: Successful response with an array of wycieczki
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wycieczka'
 *
 *   post:
 *     summary: Create a new wycieczka
 *     requestBody:
 *       description: Wycieczka data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wycieczka'
 *     responses:
 *       '201':
 *         description: Wycieczka created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wycieczka'
 *
 * /api/wycieczki/{tripId}:
 *   get:
 *     summary: Get a wycieczka by tripId
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         description: ID of the wycieczka to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the wycieczka data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wycieczka'
 *
 *   put:
 *     summary: Update a wycieczka by tripId
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         description: ID of the wycieczka to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated wycieczka data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wycieczka'
 *     responses:
 *       '200':
 *         description: Wycieczka updated successfully
 *
 *   delete:
 *     summary: Delete a wycieczka by tripId
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         description: ID of the wycieczka to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Wycieczka deleted successfully
 *       '404':
 *         description: Wycieczka not found
 */


export const deleteWycieczka = async (req, res, next) => {
    try {
        const tripId = req.params.tripId; // Assuming tripId is passed as a query parameter
    
        // Create a query to find the wycieczka by tripId
        const q = query(collection(db, collectionName), where('Id', '==', parseInt(tripId)));
    
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
    
        // Check if any documents were found
        if (querySnapshot.size > 0) {
            // Retrieve the first document found
            const docToDelete = querySnapshot.docs[0];
    
            // Delete the document
            await deleteDoc(doc(db, collectionName, docToDelete.id));
    
            res.status(200).send('Wycieczka deleted successfully');
        } else {
            res.status(404).send('Wycieczka not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateWycieczka = async (req, res, next) => {
    try {
        const tripId = req.params.tripId; // Assuming tripId is passed as a query parameter
        const updatedData = req.body; // Assuming the updated data is passed in the request body
    
        // Create a query to find the wycieczka by tripId
        const q = query(collection(db, collectionName), where('Id', '==', parseInt(tripId)));
    
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
    
        // Check if any documents were found
        if (querySnapshot.size > 0) {
            // Retrieve the first document found
            const docToUpdate = querySnapshot.docs[0];
    
            // Update the document
            await updateDoc(doc(db, collectionName, docToUpdate.id), updatedData);
    
            res.status(200).send('Wycieczka updated successfully');
        } else {
            res.status(404).send('Wycieczka not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateWycieczkaSpots = async (req, res, next) => {
    try {
        const tripId = req.params.tripId; // Assuming tripId is passed as a query parameter
        const updatedData = req.body; // Assuming the updated data is passed in the request body
    
        // Create a query to find the wycieczka by tripId
        const q = query(collection(db, collectionName), where('Id', '==', parseInt(tripId)));
    
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
    
        // Check if any documents were found
        if (querySnapshot.size > 0) {
            // Retrieve the first document found
            const docToUpdate = querySnapshot.docs[0];

            const wycieczka = new Wycieczka(
                docToUpdate.data().Id,
                docToUpdate.data().Nazwa,
                docToUpdate.data().Kraj,
                docToUpdate.data().DataRozpoczecia,
                docToUpdate.data().DataZakonczenia,
                docToUpdate.data().CenaJednostkowa,
                parseInt(updatedData),
                docToUpdate.data().IloscMiejsc,
                docToUpdate.data().Opis,
                docToUpdate.data().DlugiOpis,
                docToUpdate.data().Ocena
            );
            // Update the document
            await updateDoc(doc(db, collectionName, docToUpdate.id), updatedData);
    
            res.status(200).send('Wycieczka updated successfully');
        } else {
            res.status(404).send('Wycieczka not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateWycieczkaRating = async (req, res, next) => {
    try {
        const tripId = req.params.tripId; // Assuming tripId is passed as a query parameter
        const updatedData = req.body; // Assuming the updated data is passed in the request body
    
        // Create a query to find the wycieczka by tripId
        const q = query(collection(db, collectionName), where('Id', '==', parseInt(tripId)));
    
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
    
        // Check if any documents were found
        if (querySnapshot.size > 0) {
            // Retrieve the first document found
            const docToUpdate = querySnapshot.docs[0];

            const wycieczka = new Wycieczka(
                docToUpdate.data().Id,
                docToUpdate.data().Nazwa,
                docToUpdate.data().Kraj,
                docToUpdate.data().DataRozpoczecia,
                docToUpdate.data().DataZakonczenia,
                docToUpdate.data().CenaJednostkowa,
                docToUpdate.data().MaxIloscMiejsc,
                docToUpdate.data().IloscMiejsc,
                docToUpdate.data().Opis,
                docToUpdate.data().DlugiOpis,
                parseInt(updatedData)
            );
            // Update the document
            await updateDoc(doc(db, collectionName, docToUpdate.id), updatedData);
    
            res.status(200).send('Wycieczka updated successfully');
        } else {
            res.status(404).send('Wycieczka not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getAllWycieczki = async (req, res, next) => {
    try {
        const wycieczkiSnapshot = await getDocs(collection(db, collectionName));
        const wycieczkiArray = [];

        if (wycieczkiSnapshot.empty) {
            res.status(404).send('Wycieczka not found');
        } else {
            wycieczkiSnapshot.forEach((doc) => {
                const wycieczka = new Wycieczka(
                    doc.data().Id,
                    doc.data().Nazwa,
                    doc.data().Kraj,
                    doc.data().DataRozpoczecia,
                    doc.data().DataZakonczenia,
                    doc.data().CenaJednostkowa,
                    doc.data().MaxIloscMiejsc,
                    doc.data().IloscMiejsc,
                    doc.data().Opis,
                    doc.data().DlugiOpis,
                    doc.data().Ocena
                );
                wycieczkiArray.push(wycieczka);
            });

            res.status(200).send(wycieczkiArray);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getWycieczkaByTripId = async (req, res, next) => {
    try {
        const tripId = req.params.tripId; // Assuming tripId is passed as a query parameter

        // Create a query to find the wycieczka by tripId
        const q = query(collection(db, collectionName), where('Id', '==', parseInt(tripId)));

        // Get the documents that match the query
        const querySnapshot = await getDocs(q);

        // Check if any documents were found
        if (querySnapshot.size > 0) {
            // Retrieve the first document found
            const docData = querySnapshot.docs[0].data();

            const wycieczka = new Wycieczka(
                docData.Id,
                docData.Nazwa,
                docData.Kraj,
                docData.DataRozpoczecia,
                docData.DataZakonczenia,
                docData.CenaJednostkowa,
                docData.MaxIloscMiejsc,
                docData.IloscMiejsc,
                docData.Opis,
                docData.DlugiOpis,
                docData.Ocena
            );

            res.status(200).send(wycieczka);
        } else {
            res.status(404).send('Wycieczka not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createWycieczka = async (req, res, next) => {
    try {
        const data = req.body;
        const newId = req.params.Id;
        console.log(data);
        const customDocRef = doc(db, collectionName, newId);
        await setDoc(customDocRef, data);

        res.status(200).send("Wycieczka added");
    } catch (error) {
        res.status(400).send(error.message);
    }
};