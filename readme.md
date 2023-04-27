# TODO REST API
### Description
This is a REST API for a TODO application. It is built using NodeJs, Express and MySQL.
### Installation
1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Create a `.env` file in the root directory and add the following variables
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo
```
4. Run `npm start` to start the server
### API Endpoints
#### User
1. `POST /api/create-user` - Register a new user
2. `POST /api/login` - Login a user
3. `GET /api/logout` - Logout a user
#### Todo
1. `POST /api/create-todo` - Create a new todo
2. `GET /api/get-todos` - Get all todos
3. `GET /api/get-todo/:id` - Get a todo by id
4. `PUT /api/update-todo/:id` - Update a todo by id
5. `DELETE /api/delete-todo/:id` - Delete a todo by id
