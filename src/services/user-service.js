const { UserRepository, RoleRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');
const { Auth, Enums } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function SingUp(data) {
    try {
        console.log(`inside user Service `)
        const user = await userRepository.create(data);
        const role = await roleRepository.getRoleByName(Enums.USER_ROLES_ENUM.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        console.log(`inside user Service`,error);
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
        console.log(error);

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
        if(error.name == 'TokenExpiredError'){
            throw new AppError(`JWT Token Has Expired`,StatusCodes.BAD_REQUEST);
        }

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