var express = require('express');
var ApiResponse = require('../dtos/api_response_dto');
var router = express.Router();

/* GET ping. */
router.get('/ping', function(_, res, next) {
 return ApiResponse.error(res,200,{msg:"pong"},"resultado exitoso");
});


module.exports = router;
