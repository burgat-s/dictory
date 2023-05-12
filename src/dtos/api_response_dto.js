let BaseDto = require('./base_dto');
const Helper = require('../helpers/helper')
class Api_response_dto extends BaseDto
{
    status ;
    code ;
    message ;
    result ;
    errors ;


    successStructure = function()
    {
        return ["status","code","message","result"];
    };

    errorStructure = function(){
        return ["status","code","message","errors"];
    };

    success = function( res, code, result = false, message = null)
    {
        let responseBody = {};
        responseBody["status"] = "success";
        responseBody["code"] = code;
        if (result) {
            responseBody["result"] = result;
        }
        if (message !== null) {
            responseBody["message"] = message;
        } else {
            switch (code) {
                case 200:
                    responseBody["message"] = "La solicitud ha tenido éxito.";
                    break;
                case 201:
                    responseBody["message"] = "El recurso se creo correctamente.";
                    break;
                default:
                    responseBody["message"] = "";
            }
        }
        return this.sendResponse(res,code,responseBody);
    }

    error = function( res, code,   errors = {},message = null)
    {
        let responseBody = {};
        responseBody["status"] = "ERROR";
        responseBody["code"] = code;
        if (!Helper.isEmpty(errors) ) {
            responseBody["errors"] = errors;
        }
        if (message !== null) {
            responseBody["message"] = message;
        } else {
            switch (code) {
                case 400:
                    responseBody["message"] = "Solicitud incorrecta.";
                    break;
                case 401:
                    responseBody["message"] = "Usuario no autorizado.";
                    break;
                case 403:
                    responseBody["message"] = "El Usuario no tiene permisos para esta action.";
                    break;
                case 404:
                    responseBody["message"] = "Objeto {model} no encontrado.";
                    break;
                default:
                    responseBody["message"] = message;
            }
        }

       return this.sendResponse(res,code,responseBody);
    }

    sendResponse = function(res,code,body){
         return res.status(code).json(this.fillCustom(body))
    }
}
module.exports = new Api_response_dto

