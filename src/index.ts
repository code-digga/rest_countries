import express, { Application } from 'express';
import morgan from 'morgan';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import setupSwagger from './swagger';
import countryRoutes from './routes/countryRoutes';
import logger from './utils/logger';

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logger
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Routes
app.use('/api', countryRoutes);

// Swagger setup
setupSwagger(app);

// Error handling middleware
app.use((err: any, res: any, next: any) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
