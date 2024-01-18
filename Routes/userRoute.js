import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../Controllers/userController.js';

const router = express.Router();

// GET all users
router.get('/users', getUsers);

// POST create a new user
router.post('/users', createUser);

// PUT update an existing user
router.put('/users/:uid', updateUser);

// DELETE delete an existing user
router.delete('/users/:uid', deleteUser);

export default router;
