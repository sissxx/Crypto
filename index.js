const express = require('express');
const cookieParser = require('cookie-parser');

const hbs = require('express-handlebars');
const router = require('./routes');

const { initializeDataBase } = require('./config/dataBase');
const { PORT } = require('./config/env');
const { auth } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errHandleMiddleware');

const app = express();
app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(auth);
app.use(router);
app.use(errorHandler);

initializeDataBase();

app.listen(PORT, () => console.log(`Server is running on port 3000`));



