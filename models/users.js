
var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var User = new keystone.List('User');
 
User.add({
    name: { type: Types.Name, required: true, index: true },
    CPF: {type: Types.Text, initial: true},
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true },
    nubankPass: { type: Types.Password, initial: false},
    canAccessKeystone: { type: Boolean, initial: true }
});
 
User.register();
