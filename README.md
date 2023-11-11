# GUÍA DE DESPLIEGUE DEL VISOR DE BLOQUEOS

Este proyecto esta realizado con tecnologías JavaScript.

- **FrontEnd**: Libreria React Js ([https://react.dev](https://react.dev)) 
- **BackEnd**: Node Js, entorno de ejecución de Javascript en el servidor. Construido con el motoro V8 de Js en Chrome. ([https://nodejs.org/es](https://nodejs.org/es))

## Requerimientos:

**Entorno de Ejecución**

Instalar el entorno de ejecución del aplicativo, para ello dirigirse a [https://nodejs.org/es](https://nodejs.org/es) y descargar la versión LTS más reciente.

Seguir las indicaciones que trae por defecto el instalador.

Para corroborar que la instalación se haya realizado de manera correcta, ejecutar los siguientes comandos en el command propmt del sistema(cdm, bash, zsh, etc.):

### `node --version` 
Ejemplo de respuesta: `v18.16.1`
### `npm --version`
Ejemplo de respuesta: `9.7.2`

---

**Dependencias**

Luego se requiere instalar las dependencias del aplicativo, para ello dirigirse a la raíz del proyecto y ejecutar el siguiente comando:

### `npm install`

#### Lista de dependencias actuales del proyecto:

```
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"jsonwebtoken": "^9.0.2",
"mssql": "^9.1.1",
"uuid": "^9.0.1"
```

---

**Configuración de la Aplicación**

Para configurar las variables de entorno del proyecto, dirigirse a la raíz del proyecto y editar el archivo `.env`

```
#Server
PORT=3007                           (Puerto en donde la aplicación escuchara las 
                                     solicitudes HTTP. Si no se 
                                     configura, por defecto sera el puerto 8080)

#Database
SERVER_DATABASE=localhost           (Nombre del Servidor de Base de Datos)
DATABASE_NAME=SpringSaludFake       (Nombre de la Base de Datos)
USER_DB=visorUser                   (Usuario de la Base de Datos)
PASSWORD_DB=517667Hc@               (Contraseña del usuario de la Base de Datos)

#Token de sesión
SECRET_SESSION=p4$$w0rd  --> Clave secreta para firmar el token de               sesión de usuario.
SECRET_REFRESH=p4$$w0rd2 --> Clave secreta para firmar el token que refresca la sesión del usuario.
EXPIRE_SESSION_TIME=24h --> Tiempo de expiración del token de sesión en horas.
#En horas   
EXPIRE_REFRESH_TOKEN_TIME=24 --> Tiempo de expiración del token de refresco en horas.

#Sps:

#Bloqueos:
SP_GET_LOCKS=SS_GI_VisorBloqueos_V2                 --> Lista de Bloqueos
SP_GET_REPORT_LOCKS=SS_GI_VisorBloqueos_Reporte     --> Reporte de Bloqueos
SP_kILL_LOCKS=SS_GI_VisorBloqueos_Killer_V2         --> Killer
SP_SIGNIN_USERS=USP_GI_TraerUsuario                 --> Login

```

---

## Ejecución:

Terminadas de instalar las dependencias y aplicar las configuraciones necesarias, la aplicación esta lista para ser levantada.

Para ello ejecutar el siguiente comando en la raiz del proyecto

### `npm start`

Si todo fue realizado correctamente, se debería tener la siguiente respuesta:

```
Servidor corriendo en el puerto : 3007
Para acceder al aplicativo: http://localhost:3007
```


---

Si se requiere cambiar la configuración de la aplicación, ejecutar la combinación de teclas `ctrl + C` para detener el aplicativo. Realizar los cambios necesarios y volver a levantar el aplciativo con el comando `npm start`.

---

## Despliegue en Servidor

Para desplegar en el servidor se requiere instalar la dependencia PM2, con el isugiente comando:

### `npm install pm2 -g`

Una vez instalada la libreria pm2, solo debemos situarnos sobre el proyecto y ejecutar el siguiente comando para levantar la app en el servidor:

### `pm2 start app.js --name "[Nombre del proceso]"`

Tener en cuenta que en `[Nombre del proceso]` se indicar el nombre que tendrá la instancia de la aplicación.

Luego para verificar que la aplicación este corriendo, correr el siguiente comando:

### `pm2 list`

---

