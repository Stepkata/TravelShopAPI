import express from 'express';

import {
  createPhoto,
  getPhotos,
  deletePhoto,
} from '../Controllers/photoController.js';



const router = express.Router();

router.get('/photos', getPhotos);
router.post('/photos/new', createPhoto);
router.delete('/photos/:tripId', deletePhoto);


export default router;
