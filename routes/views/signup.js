// @file signup.js
// @path /routes/views/signup.js
// @description Handles the post request when the user tries to sign up.
// @url https://github.com/keystonejs/generator-keystone/issues/10
//
var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'signup';
	locals.filters = {};
	locals.data = {};

	locals.formData = req.body || {};

	//on post request in the form
	view.on('post', { action: 'user.create' }, function(next) {

		if(locals.formData.password !== locals.formData.password_confirm){
			//req.flash('error', { title: 'The passwords do not match.'});
			next();
		}

		var newUser = new User.model({
			name: {
				first: locals.formData.first,
				last: locals.formData.last
			},
			email: locals.formData.email,
			CPF: locals.formData.cpf,
			password: locals.formData.password
		});

		newUser.isAdmin = false;

		newUser.save(function(err, result) {
			if (err) {
				if(err.code == "11000"){
					//req.flash('error', { title: 'User already exists.'});
				}
			} else {
				console.log("Add new user" + newUser.name);

				//req.flash('success', { title: 'Account created. Please sign in.'});

				return res.redirect('/keystone/signin');
			}
			next();
		});

	});

	// Render the view
	view.render('signup');
};