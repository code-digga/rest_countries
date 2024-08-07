
import { Request, Response } from 'express';
import { fetchAllCountries, fetchCountryByName, fetchAllRegions, fetchAllLanguages, fetchStatistics } from '../services/countryService';

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = await fetchAllCountries();
    const { page = 1, limit = 10, region, population, sortBy, sortOrder = 'asc' } = req.query;

    let filteredCountries = countries;

    if (region) {
      filteredCountries = filteredCountries.filter((country: any) => country.region === region);
    }

    if (population) {
      filteredCountries = filteredCountries.filter((country: any) => country.population <= Number(population));
    }

    if (sortBy) {
      const sortByStr = Array.isArray(sortBy) ? sortBy[0] as string : sortBy as string;
      const sortOrderStr = Array.isArray(sortOrder) ? sortOrder[0] as string : sortOrder as string;

      filteredCountries.sort((a: any, b: any) => {
        if (sortOrderStr === 'desc') {
          return b[sortByStr] > a[sortByStr] ? 1 : -1;
        } else {
          return a[sortByStr] > b[sortByStr] ? 1 : -1;
        }
      });
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

    res.status(200).json(paginatedCountries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

export const getCountryByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    const country = await fetchCountryByName(name);
    res.status(200).json(country); 
  } catch (error) {
    console.error(`Failed to fetch country ${name}:`, error);
    res.status(500).json({ error: 'Failed to fetch country' });
  }
};


export const getAllRegions = async (req: Request, res: Response) => {
  try {
    const regions = await fetchAllRegions();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
};

export const getAllLanguages = async (req: Request, res: Response) => {
  try {
    const languages = await fetchAllLanguages();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const statistics = await fetchStatistics();
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
