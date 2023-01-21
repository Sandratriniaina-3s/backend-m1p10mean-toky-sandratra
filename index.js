var express = require('express');
var app = express();
var cors = require('cors');
const authorize = require('./middlewares/jwtAuthentication');

const bodyParser = require('body-parser');
const carsRouter = require("./routes/carsRoute");
const usersRouter = require("./routes/usersRoute");
const repairsRouter = require('./routes/repairsRoute');
const operationsRouter = require('./routes/operationsRoute');
const paymentsRouter = require('./routes/paymentsRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/garage/cars", authorize, carsRouter);
app.use("/garage/users", usersRouter);
app.use("/garage/repairs", authorize, repairsRouter);
app.use("/garage/operations", authorize, operationsRouter);
app.use("/garage/payments", authorize, paymentsRouter);

const port = process.env.PORT || 8000;

app.listen(port,  function(){
    console.log('Server is running on port ' + port );
});