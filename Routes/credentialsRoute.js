import express from 'express';
import {
    createCredentials,
    getUserCredentials,
    deleteCredentials,
    updateCredentialsPassword,
    updateCredentialsToken
} from './credentialsController';

const credentialsRouter = express.Router();

credentialsRouter.post('/credentials/create/:userId', createCredentials);
credentialsRouter.get('/credentials/:userId', getUserCredentials);
credentialsRouter.delete('/credentials/:userId', deleteCredentials);
credentialsRouter.put('/credentials/update/password/:userId', updateCredentialsPassword);
credentialsRouter.put('/credentials/update/token/:userId', updateCredentialsToken);

export default credentialsRouter;
