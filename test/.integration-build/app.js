var ApplicationFactory_1 = require("../../build/ApplicationFactory");
var Models = require("./app/models");
var Controllers = require("./app/controllers");
var __ROOT_DIR__ = require('path').join(__dirname, '.');
var app = ApplicationFactory_1.ApplicationFactory.create(__ROOT_DIR__, new ApplicationFactory_1.FactoryConfig("/app.json"));
app.addModels(Models);
app.addControllers(Controllers);
app.start();
