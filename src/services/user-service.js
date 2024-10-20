const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');
const { StatusCodes } = require('http-status-codes');

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if (error.name == 'SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        
        throw new AppError('Cannot create a new User Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
 
module.exports = {
    createUser
}  