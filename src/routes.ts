import express from 'express';
import knex from './database/connection';

import PointsControllers from './controllers/PointsController';
import ItemsControllers from './controllers/ItemsController';

import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsControllers();
const itemsController = new ItemsControllers();

routes.get('/items', itemsController.index);

routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points/', pointsController.index);

export default routes;
