var keystone = require('keystone');
var User = keystone.list('User');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'home';
	locals.filters = {};
	locals.data = {};

	locals.formData = req.body || {};

	view.on('post', { action: 'nubank.pull' }, function(next) {
		var passd = locals.formData.password;

		User.model.findOne({ email: req.user.email}, function(findError, user) {
		  if (findError) {
		    console.log("Error to find user");
		  } else {
		    user.nubankPass = passd;
		    user.save(function(saveError) {
		      if (saveError) {
		        console.log(saveError)
		      }
		    });
		    next();
		  }
		});
	});

	// Render the view
	view.render('home');
    
}