let { Op } = require("sequelize");
let Users =  require("../models/user");

class UserService {

  // Retorna un Usuario por su ID y sus Roles asociados
  async getUserById(id) {

    try {

      let message = '';

      // Find a User from ID User
      const UserFinOne = await Users.findOne({
        where: {
          [Op.and]: [
            { id: id }
          ]
        }
      });

      // Hask if have a User record
      if (UserFinOne === null) {
        return {
          ok: false,
          statusCode: 403,
          msg: 'Usuario no encontrado.'
        }
      }

      // Valid if active User
      if (!UserFinOne['activo']) {
        return {
          ok: false,
          statusCode: 403,
          msg: 'Usuario inactivo.'
        }
      }

      // Find all Roles Relation from ID User
      const UsersRolesRelFindAll = await UsersRolesRel.findAll({
        where: {
          [Op.and]: [
            { userId: id },
            { activo: '1' }
          ]
        }
      });

      console.log('UsersRolesRelFindAll',UsersRolesRelFindAll);

      if (UsersRolesRelFindAll.length === 0) {
        message = 'Este usuario no tiene Roles asignados'
      }

      return { 
        ok: true,
        msg: message,
        data: {
          id: UserFinOne['id'],
          username: UserFinOne['username'],
          email: UserFinOne['email'],
          name: UserFinOne['name'],
          last_name: UserFinOne['last_name'],
          dni: UserFinOne['dni'],
          cell_phone: UserFinOne['cell_phone'],
          roleId: UserFinOne['roleId'],
          roles:UsersRolesRelFindAll
        },
      };

    } catch (error) {
      
    }
  }

  // Recuperamos datos del Usuario por su email
  async getUserByEmail(email) {
    
    const UserFindOne = await Users.findOne({
      where: {
        email: email
      }
    })

    // Hask if have a Calendar record
    if (UserFindOne === null) {
      return {
        ok: false,
        msg: 'Usuario no encontrado.',
        data: ''
      }
    } else {
      return {
        ok: true,
        msg: '',
        data: UserFindOne
      }
    }

  }

  // Recuperamos datos del Usuario por su email
  async UsersRolesRelFindAllById(userId) {
    
    const UsersRolesRelFindAll = await UsersRolesRel.findAll({
      where: {
        [Op.and]: [
          { userId: userId },
          { activo: '1' }
        ]
      }
    });
    
    // Hask if have a Calendar record
    if (UsersRolesRelFindAll.length !== 0) {
      return {
        ok: true,
        msg: '',
        data: UsersRolesRelFindAll
      }
    } else {
      return {
        ok: false,
        msg: 'Roles de Usuario no encontrado.',
        data: ''
      }
    }

  }

  // Retorna un Usuario por su numero de legajo (empleg) y sus Roles asociados
  async getUserByEmpleg(emplegr) {

    try {

      let message = '';

      // Find a User from empleg User
      const UserFinOne = await Users.findOne({
        where: {
          [Op.and]: [
            { empleg: empleg }
          ]
        }
      });

      // Hask if have a User record
      if (UserFinOne === null) {
        return {
          ok: false,
          statusCode: 403,
          msg: 'Usuario no encontrado.'
        }
      }

      // Valid if active User
      if (!UserFinOne['activo']) {
        return {
          ok: false,
          statusCode: 403,
          msg: 'Usuario inactivo.'
        }
      }

      // Find all Roles Relation from ID User
      const UsersRolesRelFindAll = await UsersRolesRel.findAll({
        where: {
          [Op.and]: [
            { userId: UserFinOne['id'] },
            { activo: '1' }
          ]
        }
      });

      console.log('UsersRolesRelFindAll',UsersRolesRelFindAll);

      if (UsersRolesRelFindAll.length === 0) {
        message = 'Este usuario no tiene Roles asignados'
      }

      return { 
        ok: true,
        msg: message,
        data: {
          id: UserFinOne['id'],
          username: UserFinOne['username'],
          email: UserFinOne['email'],
          name: UserFinOne['name'],
          last_name: UserFinOne['last_name'],
          dni: UserFinOne['dni'],
          cell_phone: UserFinOne['cell_phone'],
          roleId: UserFinOne['roleId'],
          roles:UsersRolesRelFindAll
        },
      };

    } catch (error) {
      
    }
  }

  // Crea Usuario pasandole los datos de un empleado
  async createUserByEmployer(email) {
    
    const UserFindOne = await Users.findOne({
      where: {
        email: email
      }
    })

    // Hask if have a Calendar record
    if (UserFindOne === null) {
      return {
        ok: false,
        msg: 'Usuario no encontrado.',
        data: ''
      }
    } else {
      return {
        ok: true,
        msg: '',
        data: UserFindOne
      }
    }

  }

}

module.exports = UserService