const { UserService } = require('../services');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/* 
* POST : /singup
* req-body : {email: 'a@1', password:'1234'} 
*/

async function Singup(req,res) {
    try {
        const user = await UserService.SingUp({
            email : req.body.email,
            password : req.body.password
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


async function Singin(req,res) {
    try {
        const user = await UserService.SingIn({
            email : req.body.email,
            password : req.body.password
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function addRoleToUser(req,res) {
    try {
        const user = await UserService.addRoletoUser({
            id : req.body.id,
            role : req.body.role,
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    Singup,
    Singin,
    addRoleToUser
}