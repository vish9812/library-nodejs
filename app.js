require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const commonData = {
  nav: [
    {
      link: '/books',
      title: 'Books',
    },
    {
      link: '/authors',
      title: 'Authors',
    }],
  title: 'Library',
};

const bookRouter = require('./src/routes/bookRoutes')(commonData);
const adminRouter = require('./src/routes/adminRoutes')(commonData);

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.listen(port, () => {
  debug(`Listening on ${chalk.green(port)}`);
});
