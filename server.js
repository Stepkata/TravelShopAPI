import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import    swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.js';

import historyRoute from "./Routes/historyRoute.js";
import photosRoute from "./Routes/photosRoute.js";
import tripRoute from "./Routes/tripRoute.js";
import reviewRoute from "./Routes/reviewRoute.js";
import userRoute from "./Routes/userRoute.js";
import credentialsRoute from "./Routes/credentialsRoute.js";
import expressOasGenerator from'express-oas-generator';

const app = express();
app.use(bodyParser.json());
app.use(cors());


dotenv.config({path: './.env'});

app.use('/api', historyRoute);
app.use('/api', photosRoute);
app.use('/api', tripRoute);
app.use('/api', userRoute);
app.use('/api', reviewRoute);
app.use('/api', credentialsRoute);

expressOasGenerator.init(app, {});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});