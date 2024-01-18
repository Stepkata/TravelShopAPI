import { doc, collection, getDocs, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import db from './your-firestore-configuration'; // Replace with your Firestore configuration
import Credentials from './Credentials'; // Import your Credentials class

const collectionName = 'YourCredentialsCollection'; // Replace with your actual collection name

export const createCredentials = async (req, res) => {
    try {
        const { userId, password } = req.body;

        // Generate a token (you need to implement your own logic here)
        const token = generateToken();

        const credentials = new Credentials(userId, token, password);

        const customDocRef = doc(collection(db, collectionName), userId);
        await setDoc(customDocRef, credentials);

        res.status(200).send('Credentials created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
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

// Function to generate a token (replace with your own logic)
function generateToken() {
    // Implement your token generation logic here
    return 'generated-token';
}

export default credentialsController;
