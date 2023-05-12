let { hashPassword } = require('../helpers/handleBcrypt');
let { Op } = require("sequelize");
let User =  require("../models/user");
let UsersService =  require("../services/user_service");
const ApiResponse = require("../dtos/api_response_dto");

const usersService = new UsersService();

class UserController {
// Return all records of Users
 async getUsers  (req, res) {
  let size = 5;
  let page = 0;

  let filter = {};
  let filters = {};

  if (req.query.hasOwnProperty("size")) {
    size = Number(req.query.size);
  }

  if (req.query.hasOwnProperty("page")) {
    page = Number(req.query.page) * size;
  }

  if (req.query.hasOwnProperty("activo")) {
    filter.activo = req.query.activo;
  }

  if (req.query.hasOwnProperty("buscar")) {
    let query = { [Op.like]: `%${req.query.buscar}%` };

    filter = {
      [Op.or]: [
        { id: query },
        { username: query },
        { last_name: query },
        { name: query },
        { dni: query }
      ],
      ...filter,
    };
  }

  try {
    const { count, rows } = await User.findAndCountAll({
      where: filter,
      limit: size,
      offset: page,
    });

    return { data: rows, total: count };
  } catch (error) {
      ApiResponse.error(res, 500, {error}, "Error al traer datos de la DB.");
  }
};

 async newUser  (req, res) {
  try {
    const { password } = req.body;
    const passwordHash = await hashPassword(password);
      return  await User.create({
      ...req.body,
      password: passwordHash
    });
  } catch (error) {
    if (error.errors[0].message) {
        ApiResponse.error(res, 404, {0:error.errors[0].message}, error.message);
    } else {
        ApiResponse.error(res, 500, {error}, "Error al Crear Usuario.");
    }
  }
};

 async updateUser(req, res) {
  try {
    const {id} = req.params;
    const {body} = req;
    const user = await User.findByPk(id);

    if (!user) {
        ApiResponse.error(res, 500, {error}, 'No existe un Usuario con el id '+ id);
    }

   /*  const { password } = req.body;
    const passwordHash = await hashPassword(password); */
    await user.update(body)

    return {};
  } catch (error) {
      ApiResponse.error(res, 500, {error}, "Error al Actualizar datos de Usuario.");
  }
}

 async deleteUser  (req, res) {
  try {
    const {id} = req.params;
    const user = await User.findByPk(id);
    console.log('deleteUser', );
    
    if (!user) {
      res.status(404).json({
        ok: false,
        msg: 'No existe un Usuario con el id '+ id
      })
    } else {
      await user.destroy();
      return {msg:'Usuario eliminado correctamente'};
    }
  } catch (error) {
      ApiResponse.error(res, 500, {}, 'Error en el servidor');
  }
}

 async getUser  (req, res ,userId ) {
  try {
    let result = await usersService.getUserById(Number(userId));
    if (result.statusCode===403) {
        ApiResponse.error(res, 404, {0:result.msg}, result.msg);
    } else {
      return result;
    }
  } catch (error) {
      ApiResponse.error(res, 500, {error}, "Error al borrar Usuario.");
  }
}

 async updatePassword  ( req, res){
  try {
    const { id } = req.params;
    console.log(id,'Acá id...');
    
    const user = await User.findByPk(id);

    console.log(user,'user Aca...');
    

    if (!user) {
      res.status(404).json({
        ok: false,
        msg: 'No existe un Usuario con el id '+ id
      })
    }
    const { password } = req.body;
    const passwordHash = await hashPassword(password);
    await user.update({
      password: passwordHash
    })

    res.status(200).json({ok: true, msg:'Usuario actualizado correctamente'});

  } catch (error) {
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
}
}

module.exports = new UserController ()