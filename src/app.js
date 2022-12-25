require('dotenv').config();
const express = require('express');
const router = require('./routers');
const fileUploadConfig = require('./config/fileUpload.config');

const app = express();
app.use(express.json());
app.use(fileUploadConfig);

app.use('/', router);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => console.log('server started on the localhost:8008'));