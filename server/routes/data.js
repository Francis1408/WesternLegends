import express from 'express';
import { items_data }     from '../data/items.js';
import { scenarios_data } from '../data/scenarios.js';
import { characters_data } from '../data/characters.js';
import { distances_data } from '../data/distances.js';

const router = express.Router();

router.get('/items',     (req, res) => res.json(items_data));
router.get('/scenarios', (req, res) => res.json(scenarios_data));
router.get('/characters', (req, res) => res.json(characters_data));
router.get('/distances', (req, res) => res.json(distances_data));


export default router;