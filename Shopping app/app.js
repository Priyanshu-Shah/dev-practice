const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productRouter');
const usersRouter = require('./routes/usersRouter');
const indexRouter = require("./routes/index");

require("dotenv").config(); //to use all keys from keys
const db = require("./config/mongoose-connection");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);

app.listen(3000);