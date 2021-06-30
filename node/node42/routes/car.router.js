const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getAllCars);

router.post('/', carMiddleware.checkIsCarDataValid, carController.createCar);

router.get('/:carId', carMiddleware.checkIsCarExists, carController.getCarById);

router.delete('/:carId', carMiddleware.checkIsCarExists, carController.deleteCar);

router.patch('/:carId', carMiddleware.checkIsCarExists, carController.updateCar);

module.exports = router;
