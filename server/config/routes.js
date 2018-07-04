const userController = require('./../controller/users');
const chatController = require('./../controller/chats');
const pageController = require('./../controller/pages');

module.exports = function(app){
    // User API
    // app.get('/api/users', userController.getUsers);
    app.get('/api/users/id/:id', userController.getUserById);
    // app.post('/api/users', userController.createUser);
    // app.put('/api/users/:id', userController.updateUser);
    // app.delete('/api/users/:id', userController.destroyUser);
    app.put('/api/users/:id/chat-on', userController.turnChatOn);
    app.put('/api/users/:id/chat-off', userController.turnChatOff);
    // Chat API
    app.get('/api/chats', chatController.getChats);
    app.get('/api/chats/:id', chatController.getOneChat);
    app.post('/api/chats', chatController.createChat);
    app.put('/api/chats/:id', chatController.updateChat);
    app.delete('/api/chats/:id', chatController.destroyChat);
    // Pages
    app.get('/', pageController.index);
    app.get('/projects', pageController.projects);
    app.get('/experience', pageController.experience);
    app.get('/about', pageController.about);
    app.get('/contact', pageController.contact);
    app.get('/login/admin_access', pageController.login);
    app.post('/login', pageController.loginPost);
    // app.get('/reg', pageController.register);
    // app.post('/register', pageController.registerPost);
    app.get('/admin', pageController.admin);
    app.get('/logout', pageController.logout);
    app.get('*', (req, res)=>{
        res.redirect('/');
    })
};