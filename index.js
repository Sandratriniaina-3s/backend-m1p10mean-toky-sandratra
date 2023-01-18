var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const voitureRouter = require("./routes/voitureRoutes");
const utilisateurRouter = require("./routes/utilisateurRoutes");
const repairsRouter = require('./routes/repairsRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/garage/voiture", voitureRouter);
app.use("/garage/utilisateur", utilisateurRouter);
app.use("/garage/repairs", repairsRouter);

const port = process.env.PORT || 8000;

app.listen(port,  function(){
    console.log('Server is running on port ' + port );
});