let BaseDto = require('./base_dto');
const Helper = require('../helpers/helper')
class User_dto extends BaseDto
{
    id;
    username;
    email;
    name;
    last_name;
    dni;
    cell_phone;
}
module.exports = new User_dto

