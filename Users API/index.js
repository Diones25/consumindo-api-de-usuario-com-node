const express = require("express");
const chalk = require('chalk');
const router = require("./src/routes/routes.js");

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/",router);

app.listen(port, () => {
    console.log(chalk.bgGreenBright.black(`Servidor rodando: http://localhost:${port}`));
});
