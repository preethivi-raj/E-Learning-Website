import express from 'express';
import { complier , creditBalance } from '../contollers/complier.controller.js';

const router = express.Router();

router.post('/', complier)
router.post('/criedtBalance', creditBalance)

export default router;