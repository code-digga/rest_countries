export interface Country {
    name: {
      common: string;
    };
    population: number;
    area: number;
    region: string;
    languages: { [key: string]: string };
    borders?: string[];
  }
  
  export interface CountryStatistics {
    totalCountries: number;
    largestCountry: string;
    smallestCountry: string;
    mostWidelySpokenLanguage: string;
  }
  