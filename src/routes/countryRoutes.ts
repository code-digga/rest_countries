import express from 'express';
import {
  getAllCountries,
  getCountryByName,
  getAllRegions,
  getAllLanguages,
  getStatistics
} from '../controllers/countryController';

const router = express.Router();

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Retrieve a list of countries
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of countries per page
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter countries by region
 *       - in: query
 *         name: population
 *         schema:
 *           type: integer
 *         description: Filter countries by population (less than or equal to)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The order of sorting (asc or desc)
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/countries', getAllCountries);

/**
 * @swagger
 * /api/countries/{name}:
 *   get:
 *     summary: Retrieve a single country by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The country name
 *     responses:
 *       200:
 *         description: A single country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/countries/:name', getCountryByName);

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Retrieve a list of regions
 *     responses:
 *       200:
 *         description: A list of regions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/regions', getAllRegions);

/**
 * @swagger
 * /api/languages:
 *   get:
 *     summary: Retrieve a list of languages
 *     responses:
 *       200:
 *         description: A list of languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/languages', getAllLanguages);

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Retrieve statistical data
 *     responses:
 *       200:
 *         description: Statistical data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/statistics', getStatistics);

export default router;
