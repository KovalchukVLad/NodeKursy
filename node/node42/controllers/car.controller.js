const { Car } = require('../dataBase');
const { responceCodesEnum } = require('../constants');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await Car.find({});

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await Car.create(req.body);

            res.status(responceCodesEnum.CREATED).json(createdCar);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            const { car } = req;
            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;
            await Car.deleteOne({ _id: carId });

            res.json('success delete');
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res) => {
        const { carId } = req.params;
        await Car.updateOne({ _id: carId }, { ...req.body });

        res.json('success update');
    }
};
