const User = require('./user');
const Role = require('./role');

//Sequalize agrega la foranea con el nombre de la asociacion mas Id
//solo para ilustrar la llave forenea.
User.belongsTo(Role); 

module.exports = {
    User,
    Role
};