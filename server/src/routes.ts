import express from 'express';
import knex from './database/connection';

import PointsControllers from './controllers/PointsController';
import ItemsControllers from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsControllers();
const itemsController = new ItemsControllers();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);

export default routes;
