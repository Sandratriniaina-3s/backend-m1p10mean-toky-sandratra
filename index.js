var express = require('express');
var app = express();
var cors = require('cors');

const bodyParser = require('body-parser');
const carsRouter = require("./routes/carsRoute");
const usersRouter = require("./routes/usersRoute");
const repairsRouter = require('./routes/repairsRoute');
const operationsRouter = require('./routes/operationsRoute');
const paymentsRouter = require('./routes/paymentsRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/garage/cars", carsRouter);
app.use("/garage/users", usersRouter);
app.use("/garage/repairs", repairsRouter);
app.use("/garage/operations",operationsRouter);
app.use("/garage/payments", paymentsRouter);

const port = process.env.PORT || 8000;

app.listen(port,  function(){
    console.log('Server is running on port ' + port );
});