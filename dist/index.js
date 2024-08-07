"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_1 = __importDefault(require("./swagger"));
const countryRoutes_1 = __importDefault(require("./routes/countryRoutes"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, csurf_1.default)({ cookie: true }));
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Logger
app.use((0, morgan_1.default)('combined', { stream: { write: (message) => logger_1.default.info(message.trim()) } }));
// Routes
app.use('/api', countryRoutes_1.default);
// Swagger setup
(0, swagger_1.default)(app);
// Error handling middleware
app.use((err, res, next) => {
    logger_1.default.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
    logger_1.default.info(`Server is running on port ${port}`);
});
