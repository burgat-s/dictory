# CONTRIBUTING

### MORGAN 
* Todas las requests se están logueando en  "/logs/access.log"

### WINSTON
* Los logs se encuentran en en  "./logs/logger_api.log" \
Modo de uso:
```
const logger = require('./src/extensions/loggers/winston');
logger.error('Logg de prueba ERROR');
logger.info('Logg de prueba INFO');
logger.warn('Logg de prueba WARN');
```

### SEQUELIZE
#### Comandos mas usados: 
```
Crear modelo y migracion: 
       " npx sequelize-cli model:generate --name treser --attributes firstName:string,lastName:string,email:string "
Correr migracion: 
       " npx sequelize db:migrate "
Crear Seeder: 
       " npx sequelize seed:generate --name seed-user "
Correr Seeders:
        " npx sequelize db:seed:all "
```

### Api Response Dto
Es una herramienta diseñada para normalizar la estructura de respuesta de la aplicación,
la cual permite  customizar el  codigo  y el mensage 

#### Success Response

```
let ApiResponse = require('../dtos/api_response_dto');
router.get('/ping', function(_, res, next) {
 let code = 200 ;
 return ApiResponse.success(res,code,{msg:"pong"},"resultado exitoso");
});
```
#### Error Response

```
let ApiResponse = require('../dtos/api_response_dto');
router.get('/ping', function(_, res, next) {
 let code = 500 ;
 return ApiResponse.error(res,code,{msg:"pong"},"se produjo un error.");
});
```
