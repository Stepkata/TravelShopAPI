import express from 'express';

import {
    getHistoryItems,
    createHistoryItem,
    getHistItemsById
  } from '../Controllers/historyController.js'

  const router = express.Router();

router.get('/history', getHistoryItems);
router.get('/history-items/:UserId', getHistItemsById);
router.post('/history/new', createHistoryItem);

export default router;