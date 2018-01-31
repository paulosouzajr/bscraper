	var keystone = require('keystone');
	var User = keystone.list('User');
	var phantom = require('phantom');

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

		(async function() {
			const instance = await phantom.create();
			const page = await instance.createPage();

			//need to define a "recent browser"
			//page.property('userAgent') = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

			await page.on('onResourceRequested', function(requestData) {
				console.info('Requesting');
			});
			await page.on('onLoadFinished', function(){
				response = page.property('content');
				console.log(response);	
				response.then(function(result) {
					console.log(result);
				})
			});  

			const status = await page.open('https://app.nubank.com.br/#/login');
			const content = await page.property('content');

			await page.evaluate(function() {
				document.querySelector("input[name='username']").value = user.CPF;
				document.querySelector("input[name='password']").value = user.nubankPass;
				document.querySelector("form[name='loginForm']").submit();

				console.log("submiting form: ", user.CPF);
			});



			await instance.exit();
		})();


		// Render the view
		view.render('home');

	}