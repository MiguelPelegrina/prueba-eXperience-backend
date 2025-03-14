# Prueba eXperience backend

Prueba Node/Angular:
Creación de un proyecto angular con un módulo que muestre un listado paginado de usuarios, 5 usuarios por página. Por cada usuario se mostrará: nombre de usuario, nombre, apellido1, apellido2 y correo electrónico.

En la parte superior del listado aparecerá un formulario de búsqueda que permitirá filtrar el listado por: nombre, apellidos y correo electrónico.

Creación de un proyecto node que presente un API con un endpoint de tipo POST para obtener el listado de usuarios filtrado. Dicho endopoint devolverá un json como el siguiente (deben incluirse los usuarios necesarios para que exista la paginación):

{
    "usuarios": [
        {
            "id": 1,
            "email": "admin@yopmail.com",
            "name": "admin",
            "surname1": "admin",
            "surname2": "admin",
        },
        {
            "id": 2,
            "email": "admin2@yopmail.com",
            "name": "admin2",
            "surname1": "admin2",
            "surname2": "admin2",
        },
        ...
        {
            "id": x,
            "email": "adminx@yopmail.com",
            "name": "adminx",
            "surname1": "adminx",
            "surname2": "adminx",
        }
    ]
}

El proyecto debe hacerse llegar en un gitlab público, de manera que, se pueda clonar, instalar y arrancar el proyecto para verificar el funcionamiento.

## For development

- npm run dev

## For production

- npm run build
- npm start
