const { Car } = require('../dataBase');
const { errorMessages, ErrorHandler } = require('../errors');

module.exports = {
    checkIsCarDataValid: (req, res, next) => {
        try {
            const { year, price } = req.body;

            if (year < 1980 || year > 2021 || price < 100) {
                throw new ErrorHandler(
                    403,
                    errorMessages.ENTERED_DATA_IS_NOT_VALID.message,
                    errorMessages.ENTERED_DATA_IS_NOT_VALID.code
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsCarExists: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const carById = await Car.findById(carId);

            if (!carById) {
                throw new ErrorHandler(403, errorMessages.CAR_NOT_FOUND.message, errorMessages.CAR_NOT_FOUND.code);
            }

            req.car = carById;

            next();
        } catch (e) {
            next(e);
        }
    }
};
