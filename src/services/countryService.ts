// src/services/countryService.ts
import axios from 'axios';
import NodeCache from 'node-cache';
import { Country, CountryStatistics } from '../models/countryModel';

const BASE_URL = 'https://restcountries.com/v3.1';
const cache = new NodeCache({ stdTTL: 3600 }); 

const fetchAndCacheData = async (key: string, url: string) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    return cachedData;
  } else {
    const response = await axios.get(url);
    cache.set(key, response.data);
    return response.data;
  }
};

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetchAndCacheData('all_countries', `${BASE_URL}/all`);
    return response;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const fetchCountryByName = async (name: string): Promise<Country[]> => {
  try {
    return await fetchAndCacheData(`country_${name}`, `${BASE_URL}/name/${name}`);
  } catch (error) {
    console.error(`Error fetching country ${name}:`, error);
    throw error;
  }
};

export const fetchAllRegions = async (): Promise<Record<string, Country[]>> => {
  try {
    const countries = await fetchAllCountries();
    const regions = countries.reduce((acc: Record<string, Country[]>, country: Country) => {
      if (!acc[country.region]) {
        acc[country.region] = [];
      }
      acc[country.region].push(country);
      return acc;
    }, {});
    return regions;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

export const fetchAllLanguages = async (): Promise<Record<string, Country[]>> => {
  try {
    const countries = await fetchAllCountries();
    const languages = countries.reduce((acc: Record<string, Country[]>, country: Country) => {
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
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const fetchStatistics = async (): Promise<CountryStatistics> => {
  try {
    const countries = await fetchAllCountries();

    const totalCountries = countries.length;
    const largestCountryByArea = countries.reduce((max, country) => (country.area > max.area ? country : max));
    const smallestCountryByPopulation = countries.reduce((min, country) => (country.population < min.population ? country : min));
    const languageCounts = countries.reduce((acc: Record<string, number>, country: Country) => {
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
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
