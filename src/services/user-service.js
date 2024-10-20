const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');
const { Auth } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

const userRepository = new UserRepository();

async function SingUp(data) {
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
 
async function SingIn(data){
    try {
        const user = await userRepository.findUserByEmail(data.email);
        if(!user){
            throw new AppError(`No user can be found for the given email`,StatusCodes.NOT_FOUND);
        }

        const passMatch = Auth.checkPass( data.password, user.password );

        if(!passMatch){
            throw new AppError(`Invalid Password`,StatusCodes.BAD_REQUEST);
        }

        const jwt = Auth.createToken({id : user.id, email :  user.email },);
        return jwt;

    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError(`Something went wrong `, StatusCodes.INTERNAL_SERVER_ERROR);        
    }
}

async function isAuthenticated(token) {
    try {
        if(!token){
            throw new AppError(`Missing JWT Token`,StatusCodes.BAD_REQUEST);
        }

        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        
        if(!user){
            throw new AppError(`No User Found`,StatusCodes.NOT_FOUND);
        }

        return user.id;

    } catch (error) {

        if(error instanceof AppError) throw error;

        if(error.name  == 'JsonWebTokenError'){
            throw new AppError(`Invalid JWT Token`,StatusCodes.BAD_REQUEST);
        }
    }
}
module.exports = {
    SingUp,
    SingIn,
    isAuthenticated
}