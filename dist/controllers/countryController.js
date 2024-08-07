"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = exports.getAllLanguages = exports.getAllRegions = exports.getCountryByName = exports.getAllCountries = void 0;
const countryService_1 = require("../services/countryService");
const getAllCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, countryService_1.fetchAllCountries)();
        const { page = 1, limit = 10, region, population, sortBy, sortOrder = 'asc' } = req.query;
        let filteredCountries = countries;
        if (region) {
            filteredCountries = filteredCountries.filter((country) => country.region === region);
        }
        if (population) {
            filteredCountries = filteredCountries.filter((country) => country.population <= Number(population));
        }
        if (sortBy) {
            const sortByStr = Array.isArray(sortBy) ? sortBy[0] : sortBy;
            const sortOrderStr = Array.isArray(sortOrder) ? sortOrder[0] : sortOrder;
            filteredCountries.sort((a, b) => {
                if (sortOrderStr === 'desc') {
                    return b[sortByStr] > a[sortByStr] ? 1 : -1;
                }
                else {
                    return a[sortByStr] > b[sortByStr] ? 1 : -1;
                }
            });
        }
        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = startIndex + Number(limit);
        const paginatedCountries = filteredCountries.slice(startIndex, endIndex);
        res.status(200).json(paginatedCountries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
});
exports.getAllCountries = getAllCountries;
const getCountryByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const country = yield (0, countryService_1.fetchCountryByName)(name);
        res.status(200).json(country);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch country' });
    }
});
exports.getCountryByName = getCountryByName;
const getAllRegions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regions = yield (0, countryService_1.fetchAllRegions)();
        res.status(200).json(regions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch regions' });
    }
});
exports.getAllRegions = getAllRegions;
const getAllLanguages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languages = yield (0, countryService_1.fetchAllLanguages)();
        res.status(200).json(languages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch languages' });
    }
});
exports.getAllLanguages = getAllLanguages;
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statistics = yield (0, countryService_1.fetchStatistics)();
        res.status(200).json(statistics);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});
exports.getStatistics = getStatistics;
