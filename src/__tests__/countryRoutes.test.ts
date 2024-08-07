import request from 'supertest';
import express, { Application } from 'express';
import countryRoutes from '../routes/countryRoutes';

const app: Application = express();
app.use('/api', countryRoutes);

describe('Country Routes', () => {
  test('GET /api/countries/:name', async () => {
    const response = await request(app).get('/api/countries/USA');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length).toBeGreaterThan(0); 
    expect(response.body[0].name.common).toBe('United States'); 
  });
});
