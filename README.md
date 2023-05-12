# Primeros Pasos
```
npm install
npx sequelize db:migrate
npx sequelize db:seed:all 
```

Se Recomienda leer el archivo "CONTRIBUTING.md"

# Entorno
## Sequelize
El arichivo de configuración ".sequelizerc" se encuentra en la carpeta raíz del proyecto.  
Aquí se determina que motor de base de datos se va a utilizar y las carpetas de destino de la creacion de los modelos, migraciones y semilleros.
Los archivos de configuración se encuentran dentro del directorio "root/src/config/database/mysql y  .../sqlite" respectivamente para cada motor.
* IMPORTANTE : al momento de deployar es importante configurar el archivo .sequelizerc 



## Variables dentro del ".env"

```
PORT=3001
```

variables dentro del ".env" solo si se utiliza mysql: 
```
DB_DATABASE=test
DB_USER=root
DB_PASSWORD=root
DB_HOST=127.0.0.1
```


NOTA: 
* Para desarrollar esta aplicacion se utilizo la version de node  " v14.17.3"
