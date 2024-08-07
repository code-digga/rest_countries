
import { fetchCountryByName } from '../services/countryService';

describe('Country Service', () => {
  test('should fetch country data', async () => {
    const countryData = await fetchCountryByName('USA');
    expect(countryData).toBeDefined();
    expect(countryData[0].name.common).toBe('United States');
  });
});
