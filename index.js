var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const voitureRouter = require("./routes/voitureRoutes");
const utilisateurRouter = require("./routes/utilisateurRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/garage/voiture", voitureRouter);
app.use("/garage/utilisateur", utilisateurRouter);

const port = process.env.PORT || 3000;

app.listen(port,  function(){
    console.log('Server is running on port ' + port );
})