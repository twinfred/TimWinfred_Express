const controller = require('./../controller/users');

module.exports = function(app){
    app.get('/api/users/:code', controller.getUsers);
    app.get('/api/users/:id/:code', controller.getOneUser);
    app.post('/api/users/:code', controller.createUser);
    app.put('/api/users/:id/:code', controller.updateUser);
    app.delete('/api/users/:id/:code', controller.destroyUser);
};