const express = require('express');
const app = express();
const path = require('path');
const expbs = require('express-handlebars');
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;

const hbs = expbs.create({}); //creates the express-handlebars server with options passed through

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(routes)

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });