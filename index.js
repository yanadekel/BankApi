const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =5000;
const usersRoute = require('./routes/users.route');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users',usersRoute);

app.listen(process.env.PORT || port)
