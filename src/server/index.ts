import express, { Express, Request, Response } from "express";

// Swagger
import SwaggerUi from "swagger-ui-express";

// Security
import cors from "cors";
import helmet from "helmet";

// * Root Router
import rootRouter from "../routes";
import mongoose from "mongoose";

// TODO: HTTPS

// * Create Express APP
const server: Express = express();
const port: string | number = process.env.PORT || 8000;

// * Swagger Config and Route
server.use(
    '/docs',
     SwaggerUi.serve,
     SwaggerUi.setup(undefined, { 
        swaggerOptions: {
            url: '/swagger.json',
            explorer: true
        }
    })
);

// Static server
server.use(express.static('public'));

// TODO: Mongoose Connection
mongoose.connect('mongodb://127.0.0.1:27017/codeverification');

// * Security Config
server.use(helmet());
server.use(cors());

// * Content Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb'}));
server.use(express.json({ limit: '50mb' }));

// * Redirection Config
// http://localhost:8000/ ---> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});

// Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onover: http://localhost:8000/api/...
server.use('/api', rootRouter);

export default server;