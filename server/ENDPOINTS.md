# Documentación de los endpoints

## Auth endpoits
Los endpoints de la ruta "auth" son dos:

### /auth/register
Para llamar la ruta register se debe de enviar las siguietes creadenciales:
- name
- lastname
- correo
- password
- rol

Código de ejemplo:

cURL:
```bash
curl -H "Content-Type: application/json" -X POST -d '{"name": "John", "lastname": "Doe" "correo": "john@gmail.com", "password": "123456", "rol": true}' /auth/register
```

Success:
```bash
{
    "user": {
        "id":"d4c302b9-2f02-48c3-9b4c-a6a871161867",
        "createdAt":"2023-12-14T16:17:02.024Z",
        "updatedAt":"2023-12-14T16:17:02.024Z",
        "name":"John",
        "lastname":"Doe",
        "correo":"john@gmail.com",
        "password":"$2b$10$1sePZ8fZ6sRokGQ7DfLsK.o5F/h82Mo.awtm7ffI2KJDiWwVXJU3G",
        "Rol":true,
        "status":true
    }
}
```

Error:
```
{
    "errors":[{
        "type":"field",
        "msg":"Missing name",
        "path":"name",
        "location":"body"
    }]
}
```

### /auth/login
Para llamar la ruta login se deben de enviar las siguientes credenciales:
- correo
- password

Código de ejemplo:

cURL:
```bash
curl -H "Content-Type: application/json" -X POST -d '{ "correo": "john@gmail.com", "password": "123456"}' $url/auth/login
```

Success:
```bash
{
    "user": {
        "id":"d4c302b9-2f02-48c3-9b4c-a6a871161867",
        "createdAt":"2023-12-14T16:17:02.024Z",
        "updatedAt":"2023-12-14T16:17:02.024Z",
        "name":"John",
        "lastname":"Doe",
        "correo":"john@gmail.com",
        "password":"$2b$10$1sePZ8fZ6sRokGQ7DfLsK.o5F/h82Mo.awtm7ffI2KJDiWwVXJU3G",
        "Rol":true,
        "status":true
    }
}
```

Error:
```
{
    "errors":[{
        "type":"field",
        "msg":"Invalid email",
        "path":"email",
        "location":"body"
    }]
}

O

{
    "errors":[{
        "type":"field",
        "msg":"Email or password incorrect",
        "path":"email",
        "location":"body"
    }]
}
```

## Users endpoints
Los endpoints de la ruta "users" son cuatro:

### /
Sólo el administrador puede llamar al endpoint de la ruta "/" de users y para vadarlo se debe de enviar las siguietes creadenciales(este retorna todo los usuarios activos):
- token(debe enviarlo por los headers)

Código de ejemplo:

cURL:
```bash
curl -H "Authorization: Bearer $token" -X GET /users/
```

Success:
```bash
{
    "next":"/users?limit=10&page=1",
    "prev":null,
    "limit":10,
    "page":0,
    "total":1,
    "users":[{
        "id":"7c6adff1-de78-4966-89f8-f453888c5e1d",
        "createdAt":"2023-12-14T15:48:34.701Z",
        "updatedAt":"2023-12-14T15:48:34.701Z",
        "name":"John",
        "lastname":"Doe",
        "correo":"john2@gmail.com",
        "password":"$2b$10$anNGCU.kVM8hIZ0vgwlNge1p5qFgVfrLxWRaFq6MSodKkvmLuZWPC",
        "status":true,
        "Rol":true
        }]
}

O

{
    []
}
```

### /deleted
Sólo el administrador puede llamar al endpoint de la ruta "/deleted" y para validarlo se debe de enviar las siguientes credenciales(este retorna todos los usuarios inactivos):
- token(debe enviarlo por los headers)

Código de ejemplo:

cURL:
```bash
curl -H "Authorization: Bearer $token" -X GET /users/deleted
```

Success:
```bash
{
    "next":"/users?limit=10&page=1",
    "prev":null,
    "limit":10,
    "page":0,
    "total":1,
    "users":[{
        "id":"7c6adff1-de78-4966-89f8-f453888c5e1d",
        "createdAt":"2023-12-14T15:48:34.701Z",
        "updatedAt":"2023-12-14T15:48:34.701Z",
        "name":"John",
        "lastname":"Doe",
        "correo":"john2@gmail.com",
        "password":"$2b$10$anNGCU.kVM8hIZ0vgwlNge1p5qFgVfrLxWRaFq6MSodKkvmLuZWPC",
        "status":false,
        "Rol":true
        }]
}

O

{
    []
}
```

### /:id - PUT
Sólo el dueño de la cuenta puede llamar al endpoint de la ruta "/:id", para llamar el endpoint debe de enviar las siguientes credenciales:
- token(debe mandarlo por los headers)
- name(optional)
- lastname(optional)
- password(optional)

Código de ejemplo:

cURL:
```bash
curl -H "Authorization: Bearer $token" -H "Content-Type: application/json" -X PUT -d '{"name": "Jane"}' /:id 
```

Success:
```bash
{
    "user": {
        "id":"d4c302b9-2f02-48c3-9b4c-a6a871161867",
        "createdAt":"2023-12-14T16:17:02.024Z",
        "updatedAt":"2023-12-14T16:17:02.024Z",
        "name":"Jane",
        "lastname":"Doe",
        "correo":"john@gmail.com",
        "password":"$2b$10$1sePZ8fZ6sRokGQ7DfLsK.o5F/h82Mo.awtm7ffI2KJDiWwVXJU3G",
        "Rol":true,
        "status":true
    }
}
```

Error:
```
{
    "errors":[{
        "type":"field",
        "msg":"Invalid id",
        "path":"id",
        "location":"params"
    }]
}

O

{
    "errors":[{
        "type":"field",
        "msg":"User not exist with id: ${id}",
        "path":"id",
        "location":"params"
    }]
}

O

{
    "msg": 'User is not the owner of this account'
}
```

### /:id - DELETE 
Sólo el administrador puede llamar al endpoint de la ruta "/:id", para llamar el endpoint debe de enviar las siguientes credenciales:
- token(debe mandarlo por los headers)

Código de ejemplo:

cURL:
```bash
curl -H "Authorization: Bearer $token" -X DELETE /:id 
```

Success:
```bash
{
    "user": {
        "id":"d4c302b9-2f02-48c3-9b4c-a6a871161867",
        "createdAt":"2023-12-14T16:17:02.024Z",
        "updatedAt":"2023-12-14T16:17:02.024Z",
        "name":"Jane",
        "lastname":"Doe",
        "correo":"john@gmail.com",
        "password":"$2b$10$1sePZ8fZ6sRokGQ7DfLsK.o5F/h82Mo.awtm7ffI2KJDiWwVXJU3G",
        "Rol":true,
        "status": false
    }
}
```

Error:
```
{
    "errors":[{
        "type":"field",
        "msg":"Invalid id",
        "path":"id",
        "location":"params"
    }]
}

O

{
    "errors":[{
        "type":"field",
        "msg":"User not exist with id: ${id}",
        "path":"id",
        "location":"params"
    }]
}

O

{
    "msg": 'User can't complete this accition, because is not admin'
}
```

## *Products Endpoints*
Los endpoints de la ruta "products" son 6:

### */api/products*
Es la ruta principal, a travez de ella podemos: 
- obtener todos los productos
- crear un producto

#### GET:
Devuelve todos los productos que hayan sido creados, 

cURL:
```bash
curl -H "Authorization: Bearer $token" -X GET /api/products/
```
success:
```bash
{
    "msg": "Lista completa de Productos",
    "products": [
        {
            "id": "f670dfd5-ac9e-421a-84c4-ece8301fdf96",
            "createdAt": "2023-12-16T14:18:46.872Z",
            "updatedAt": "2023-12-16T19:21:17.000Z",
            "name": "lamborgini 350GT e",
            "category": "vehiculo",
            "price": 500000,
            "currency": "dolar",
            "stock": 10,
            "status": true,
            "description": "lamborgyni zentorno",
            "image": "zentorno.jpg",
            "createdBy": {
                "id": "65adaa17-a9cf-4513-95b9-1e63ec602066",
                "createdAt": "2023-12-16T13:58:01.749Z",
                "updatedAt": "2023-12-16T13:58:01.749Z",
                "name": "John",
                "lastname": "Doe",
                "correo": "john@gmail.com",
                "password": "$2b$10$cfpBVGPhxfW/1yOb.hgClecmPRwFoHTMi5OwQxGiVU.SCdjig7EXa",
                "status": true,
                "Rol": true
            },
            "updatedBy": {
                "id": "65adaa17-a9cf-4513-95b9-1e63ec602066",
                "createdAt": "2023-12-16T13:58:01.749Z",
                "updatedAt": "2023-12-16T13:58:01.749Z",
                "name": "John",
                "lastname": "Doe",
                "correo": "john@gmail.com",
                "password": "$2b$10$cfpBVGPhxfW/1yOb.hgClecmPRwFoHTMi5OwQxGiVU.SCdjig7EXa",
                "status": true,
                "Rol": true
            }
        }
    ]
}
```
Error: 401
```
{error: 'Missing token'}
{error: 'Invalid Beare token'}
{error: 'Invalid token'}

{msg: "User can't complete this accition, because is not admin "}
```
Error: 404
```
{msg: `No se encontraron productos en la base de datos`}
```
Error: 500
```
{
    msg: "Error al obtener los datos solicitados",
    error: error.message,
}
```
#### POST:
Permite crear un producto y guardarlo en la base de datos 

cURL:
```bash
curl -H "Authorization: Bearer $token" -X POST -d 
{
    "name" : "lamborgyni GT350",
    "category" : "vehiculo",
    "stock" : 10,
    "price" : 500000,
    "currency" : "dolar",
    "description" : "lamborgyni zentorno",
    "image" : "zentorno.jpg"
} /api/products/
```
succes:
```bash
{
    "msg": "Producto creado exitosamente",
    "products": {
        "id": "a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30",
        "createdAt": "2023-12-17T01:22:20.541Z",
        "updatedAt": "2023-12-17T01:22:20.541Z",
        "name": "lamborgyni GT350",
        "category": "vehiculo",
        "price": 500000,
        "currency": "dolar",
        "stock": 10,
        "description": "lamborgyni zentorno",
        "image": "zentorno.jpg",
        "createdBy": "65adaa17-a9cf-4513-95b9-1e63ec602066",
        "status": true
    }
}
```
Error: 401
```
{error: 'Missing token'}
{error: 'Invalid Beare token'}
{error: 'Invalid token'}

{msg: "User can't complete this accition, because is not admin "}
```
Error: 500
```
{
    msg: "Error al obtener los datos solicitados",
    error: error.message,
}
```

### */api/products/:id*
Ruta derivada de la principar para operar los productos cuyo id sea igual al enviado en los parametros
#### GET
cURL:
```bash
curl -H "Authorization: Bearer $token" -X GET /api/products/a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30
```
sucess:
```bash
{
    "msg": "producto encontrado",
    "product": {
        "id": "a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30",
        "createdAt": "2023-12-17T01:22:20.541Z",
        "updatedAt": "2023-12-17T01:22:20.541Z",
        "name": "lamborgyni GT350",
        "category": "vehiculo",
        "price": 500000,
        "currency": "dolar",
        "stock": 10,
        "status": true,
        "description": "lamborgyni zentorno",
        "image": "zentorno.jpg"
    }
}
```
Error: 401
```
{error: 'Missing token'}
{error: 'Invalid Beare token'}
{error: 'Invalid token'}

{msg: "User can't complete this accition, because is not admin "}
```
Error: 500
```
{
    msg: "Error al obtener los datos solicitados",
    error: error.message,
}
```

#### PUT
cURL:
```bash
curl -H "Authorization: Bearer $token" -X GET -d { "price": 600000 } /api/products/a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30
```
success:
```bash
{
    "msg": "Producto Actualizado correctamente",
    "product": {
        "id": "a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30",
        "createdAt": "2023-12-17T01:22:20.541Z",
        "updatedAt": "2023-12-17T06:46:54.000Z",
        "name": "lamborgyni GT350",
        "category": "vehiculo",
        "price": 600000,
        "currency": "dolar",
        "stock": 10,
        "status": true,
        "description": "lamborgyni zentorno",
        "image": "zentorno.jpg",
        "updatedBy": "65adaa17-a9cf-4513-95b9-1e63ec602066"
    }
}
```
Error: 401
```
{error: 'Missing token'}
{error: 'Invalid Beare token'}
{error: 'Invalid token'}

{msg: "User can't complete this accition, because is not admin "}
```
Error: 500
```
{
    msg: "Error al obtener los datos solicitados",
    error: error.message,
}
```
#### DELETE
Si el producto esta en estado true lo cambia a false y si el estado esta en false lo cambia a true
cURL:
```bash
curl -H "Authorization: Bearer $token" -X GET /api/products/a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30
```
success:
```bash
{
    "msg": "Estado cambiado a false",
    "product": {
        "id": "a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30",
        "createdAt": "2023-12-17T01:22:20.541Z",
        "updatedAt": "2023-12-17T06:40:55.000Z",
        "name": "lamborgyni GT350",
        "category": "vehiculo",
        "price": 500000,
        "currency": "dolar",
        "stock": 10,
        "status": false,
        "description": "lamborgyni zentorno",
        "image": "zentorno.jpg"
    }
}

{
    "msg": "Estado cambiado a true",
    "product": {
        "id": "a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30",
        "createdAt": "2023-12-17T01:22:20.541Z",
        "updatedAt": "2023-12-17T06:41:26.000Z",
        "name": "lamborgyni GT350",
        "category": "vehiculo",
        "price": 500000,
        "currency": "dolar",
        "stock": 10,
        "status": true,
        "description": "lamborgyni zentorno",
        "image": "zentorno.jpg",
        "updatedBy": "65adaa17-a9cf-4513-95b9-1e63ec602066"
    }
}
```
Error: 401
```
{error: 'Missing token'}
{error: 'Invalid Beare token'}
{error: 'Invalid token'}

{msg: "User can't complete this accition, because is not admin "}
```
Error: 500
```
{
    msg: "Error al obtener los datos solicitados",
    error: error.message,
}
```
### */api/products/:category*
Ruta derivada de la principar para operar los productos cuya caracteristica sea igual a la enviada en los parametros

#### GET
cURL:
```bash
curl -H "Authorization: Bearer $token" -X GET /api/products/vehiculo
```
success:
```bash
{
    "msg": "productos encontrados con la categoria: vehiculo",
    "products": [
        {
            "id": "a57f4c7b-83a7-4b1c-b5fb-479d85c2ae30",
            "createdAt": "2023-12-17T01:22:20.541Z",
            "updatedAt": "2023-12-17T01:22:20.541Z",
            "name": "lamborgyni GT350",
            "category": "vehiculo",
            "price": 500000,
            "currency": "dolar",
            "stock": 10,
            "status": true,
            "description": "lamborgyni zentorno",
            "image": "zentorno.jpg"
        }
    ]
}
```
Error: 401
```
{error: 'Missing token'}
{error: 'Invalid Beare token'}
{error: 'Invalid token'}

{msg: "User can't complete this accition, because is not admin "}
```
Error: 500
```
{
    msg: "Error al obtener los datos solicitados",
    error: error.message,
}
```