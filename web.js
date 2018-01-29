var keystone = require('keystone');
keystone.init({

  'name': 'BScraper',

  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'mongo': 'mongodb://localhost/bscraper',

  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'teeeest'

});

require('./models');

keystone.set('routes', require('./routes'));

keystone.start();
