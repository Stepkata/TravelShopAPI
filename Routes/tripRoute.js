import express from 'express';
import * as WycieczkaController from '../Controllers/tripController.js';

const router = express.Router();

router.get('/wycieczki', WycieczkaController.getAllWycieczki);

router.get('/wycieczki/:tripId', WycieczkaController.getWycieczkaByTripId);

router.post('/wycieczki/:Id', WycieczkaController.createWycieczka);

router.put('/wycieczki/:tripId', WycieczkaController.updateWycieczka);
router.put('/wycieczki/spots/:tripId', WycieczkaController.updateWycieczkaSpots);
router.delete('/wycieczki/:tripId', WycieczkaController.deleteWycieczka);

export default router;
