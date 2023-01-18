var express = require('express');
var app = express();
var cors = require('cors');

const bodyParser = require('body-parser');
const voitureRouter = require("./routes/voitureRoutes");
const utilisateurRouter = require("./routes/utilisateurRoutes");
const repairsRouter = require('./routes/repairsRoute');
const operationsRouter = require('./routes/operationsRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/garage/voiture", voitureRouter);
app.use("/garage/utilisateur", utilisateurRouter);
app.use("/garage/repairs", repairsRouter);
app.use("/garage/operations",operationsRouter);

const port = process.env.PORT || 8000;

app.listen(port,  function(){
    console.log('Server is running on port ' + port );
});