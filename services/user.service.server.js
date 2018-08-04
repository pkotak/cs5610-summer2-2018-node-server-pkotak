module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/profile', profile);
    app.put('/api/profile', updateUser);
    app.delete('/api/profile', deleteUser);
    app.post('/api/register', createUser);
    var userModel = require('../models/user/user.model.server');

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(user => {
                req.session['currentUser'] = user;
                res.json(user)
            })

    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            });
    }

    function updateUser(req, res) {
        var user = req.body;
        var id = req.session['currentUser']._id;
        return userModel.updateUser(id, user)
            .then(user => res.json(user));
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        return userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            });
    }

    function deleteUser(req, res) {
        var id = req.session['currentUser']._id;
        return userModel.deleteUser(id)
            .then(function (status) {
                res.send(status);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }
}