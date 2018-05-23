const userController = require('./../controller/users');
const chatController = require('./../controller/chats');
const pageController = require('./../controller/pages');

module.exports = function(app){
    // User API
    app.get('/api/users', userController.getUsers);
    app.get('/api/users/:id', userController.getOneUser);
    app.post('/api/users', userController.createUser);
    app.put('/api/users/:id', userController.updateUser);
    app.delete('/api/users/:id', userController.destroyUser);
    // Chat API
    app.get('/api/chats', chatController.getChats);
    app.get('/api/chats/:id', chatController.getOneChat);
    app.post('/api/chats', chatController.createChat);
    app.put('/api/chats/:id', chatController.updateChat);
    app.delete('/api/chats/:id', chatController.destroyChat);
    // Pages
    app.get('/', pageController.index);
    app.get('/login/admin_access', pageController.login);
    app.get('*', (req, res)=>{
        res.redirect('/');
    })
};