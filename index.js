const express = require('express');
const app = module.exports = express();
const path = require('path');
const hbs = require('express-hbs');
const hbsHelpers = require('./helpers/handlebars-helpers');

/* Set view engine */
app.set('view engine', 'hbs');

/* Configure view engine */
app.engine('hbs', hbs.express4({
  defaultLayout: './public/views/default.hbs'
}));

/* Set views path */
app.set('views', __dirname);

/* Load routes */
app.use('/static', express.static(path.join(__dirname, 'public'))) /* Set static assets path */
app.use('/search', require('./search/router'));
app.use('/results', require('./search-results/router'));
app.use(require('./router'));

module.exports = app;
