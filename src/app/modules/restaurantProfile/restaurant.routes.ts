import express from 'express'
import restaurantController from './restaurant.controller';

const restaurantRouter = express.Router();

restaurantRouter.post('/complete-profile/:id',restaurantController.completeRestaurantProfile)
export default restaurantRouter