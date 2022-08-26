# TTADS-Frontend
TP de frontend TTADS 2022

[![Build](https://github.com/juan9889/ttads-frontend/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/juan9889/ttads-frontend/actions/workflows/build.yml)


[![Lint](https://github.com/juan9889/ttads-frontend/actions/workflows/linter.yml/badge.svg?branch=master&event=push)](https://github.com/juan9889/ttads-frontend/actions/workflows/linter.yml)


## Ejecutar

npm run dev
Levantar con el mismo comando el backend https://github.com/juan9889/TTADS-Backend


### Integrantes:
- Gino Bartolucci 47024
- Juan Agustin Fogliato 43724
- Cristian Gofiar 44839
## Enunciado:

### Enunciado general:
Un sistema que pueda reunir personas con un mismo interés creando eventos dentro de comunidades. 

**Usuarios:**  
Un usuario se registra, añade su ubicación (ciudad, provincia).  
Las ciudades y las provincias ya están registradas.  
Un usuario puede unirse o crear una comunidad.

**Comunidades:**  
Las comunidades tienen categorías.  
Las comunidades son creadas por usuarios. Los usuarios tienen roles dentro de la comunidad.  
Los usuarios pueden buscar comunidades. Se les muestra un listado con los datos de la comunidad, el listado se puede filtrar con categoría de comunidad.  
Las categorías de las comunidades ya están predefinidas.  

**Eventos:**  
Los eventos son creados por usuarios que pertenecen a una comunidad. 
Los eventos se crean solo dentro de comunidades.  
Los usuarios que siguen a un evento no están obligados a unirse a esa comunidad.  
Un evento tiene una fecha de caducidad. Una vez pasada esa fecha el evento se puede renovar.  
Los usuarios pueden buscar eventos. Se le muestra un listado con los datos de la ubicación y la comunidad  
Las categorías de los eventos  ya están predefinidas  

**Notificaciones:**  
Cada vez que se crea o se renueva un evento en una comunidad se notifica a los miembros de esta.   
Un evento puede publicar nuevas notificaciones las veces que quiera, incluso después de que termine.  
El usuario puede seguir uno o varios eventos para recibir nuevas notificaciones de solo ese evento específico. (es decir, no las notificaciones de la comunidad a la que pertenece ese evento).  

**Ejemplos:**  
Comunidad UTN. Un usuario puede crear un evento cuando se dan charlas, conferencias o para crear un grupo de estudio. No es necesario que un usuario pertenezca a la comunidad utn para seguir el evento.



---
**Tablas:**  [DER](https://drive.google.com/file/d/1TSV8b8KB-cDxOSWcQm3szLb_t3Qq6XOH/view?usp=sharing)
- Ciudades
- Provincia
- Usuarios
- Comunidades
- Categoría evento
- Categoría comunidad
- Evento
- Usuario_evento
- Usuario_comunidad
- Notificaciones

## Entraga del trabajo practico
- Listado de eventos y comunidades en la pagina principal.
- SearchBox de eventos por su nombre.
- Request de detalle de eventos al hacer click en "Ver detalles". Dirigir a la pagina de comunidades al hacer click en "Ver comunidad".
- Pagina para la comunidad que liste todos los eventos de la comunidad y que permita filtrar los eventos de algun modo.
- Pagina para ver todas la comunidades que permita filtrarlas por su categoria.
- En la pagina de detalle de la comunidad habra un boton para crear un evento nuevo en esa comunidad.

**Tecnologías:**
- Back: Node.js Api Rest
- Base de datos: Mysql con Sequelize
- Front: NuxtJS
- CSS: Vuetify

