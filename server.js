require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const expbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');

const helpers = require('./utils/helper');
const sequelize = require('./config/connection');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 3001;

const hbs = expbs.create({ helpers });

const sess = {
  secret: process.env.MYSECRETKEY,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(cookieParser());
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on: localhost:3001/'));
});
