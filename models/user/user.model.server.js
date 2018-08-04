var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function updateUser(userId, user){
    return userModel.update({_id: userId}, {$set: user})
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(id) {
    return userModel.findById(id);
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function deleteUser(id) {
    return userModel.remove({_id: id});
}

var api = {
    createUser: createUser,
    updateUser: updateUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    deleteUser: deleteUser,
    findUserByCredentials: findUserByCredentials
}

module.exports = api;