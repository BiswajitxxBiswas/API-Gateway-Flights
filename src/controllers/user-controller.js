const { UserService } = require('../services');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/* 
* POST : /singup
* req-body : {email: 'a@1', password:'1234'} 
*/

async function CreateUser(req,res) {
    try {
        const city = await UserService.createUser({
            email : req.body.email,
            password : req.body.password
        });
        SuccessResponse.data = city;
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
    CreateUser
}