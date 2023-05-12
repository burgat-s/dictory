let express = require('express');
let ApiResponse = require('../dtos/api_response_dto');
let UserController = require( '../controllers/user_controller');
let router = express.Router();

router.get('/', async function (req, res, next) {
  let result = await UserController.getUsers(req, res)
  return ApiResponse.success(res, 200, result, "Success.");
});

router.get('/user/:userId', async function (req, res, next) {
  const {userId} = req.params;
  let result = await UserController.getUser(req, res, userId)
  return ApiResponse.success(res, 200, result, "Success.");
});

router.post('/', async function(req, res,next)  {
  let result = await UserController.newUser(req, res)
  return ApiResponse.success(res, 200, result, "Success.");
});

router.put('/:id',  async function(req, res,next)  {
  let result = await UserController.updateUser(req, res)
  return ApiResponse.success(res, 200, result, "Success.");
});

router.delete('/:id', async function(req, res,next)  {
  let result = await UserController.deleteUser(req, res)
  return ApiResponse.success(res, 200, result, "Success.");
});


module.exports = router;
