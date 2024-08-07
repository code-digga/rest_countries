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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStatistics = exports.fetchAllLanguages = exports.fetchAllRegions = exports.fetchCountryByName = exports.fetchAllCountries = void 0;
// src/services/countryService.ts
const axios_1 = __importDefault(require("axios"));
const node_cache_1 = __importDefault(require("node-cache"));
const BASE_URL = 'https://restcountries.com/v3.1';
const cache = new node_cache_1.default({ stdTTL: 3600 });
const fetchAndCacheData = (key, url) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedData = cache.get(key);
    if (cachedData) {
        return cachedData;
    }
    else {
        const response = yield axios_1.default.get(url);
        cache.set(key, response.data);
        return response.data;
    }
});
const fetchAllCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetchAndCacheData('all_countries', `${BASE_URL}/all`);
        return response;
    }
    catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
});
exports.fetchAllCountries = fetchAllCountries;
const fetchCountryByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield fetchAndCacheData(`country_${name}`, `${BASE_URL}/name/${name}`);
    }
    catch (error) {
        console.error(`Error fetching country ${name}:`, error);
        throw error;
    }
});
exports.fetchCountryByName = fetchCountryByName;
const fetchAllRegions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, exports.fetchAllCountries)();
        const regions = countries.reduce((acc, country) => {
            if (!acc[country.region]) {
                acc[country.region] = [];
            }
            acc[country.region].push(country);
            return acc;
        }, {});
        return regions;
    }
    catch (error) {
        console.error('Error fetching regions:', error);
        throw error;
    }
});
exports.fetchAllRegions = fetchAllRegions;
const fetchAllLanguages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, exports.fetchAllCountries)();
        const languages = countries.reduce((acc, country) => {
            if (country.languages) {
                for (const language of Object.values(country.languages)) {
                    if (!acc[language]) {
                        acc[language] = [];
                    }
                    acc[language].push(country);
                }
            }
            return acc;
        }, {});
        return languages;
    }
    catch (error) {
        console.error('Error fetching languages:', error);
        throw error;
    }
});
exports.fetchAllLanguages = fetchAllLanguages;
const fetchStatistics = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield (0, exports.fetchAllCountries)();
        const totalCountries = countries.length;
        const largestCountryByArea = countries.reduce((max, country) => (country.area > max.area ? country : max));
        const smallestCountryByPopulation = countries.reduce((min, country) => (country.population < min.population ? country : min));
        const languageCounts = countries.reduce((acc, country) => {
            if (country.languages) {
                for (const language of Object.values(country.languages)) {
                    if (!acc[language]) {
                        acc[language] = 0;
                    }
                    acc[language]++;
                }
            }
            return acc;
        }, {});
        const mostWidelySpokenLanguage = Object.keys(languageCounts).reduce((a, b) => (languageCounts[a] > languageCounts[b] ? a : b));
        return {
            totalCountries,
            largestCountry: largestCountryByArea.name.common,
            smallestCountry: smallestCountryByPopulation.name.common,
            mostWidelySpokenLanguage,
        };
    }
    catch (error) {
        console.error('Error fetching statistics:', error);
        throw error;
    }
});
exports.fetchStatistics = fetchStatistics;
