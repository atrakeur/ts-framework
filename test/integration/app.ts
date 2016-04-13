/// <TYPING REFERENCES>
/// <reference path="../../typings/node/node.d.ts" />

/// <CORE IMPORTS>
import {ApplicationFactory, FactoryConfig} from "../../build/ApplicationFactory";

/// <MODEL + CONTROLLER IMPORTS>
import * as Models from "./app/models";
import * as Controllers from "./app/controllers";


// Set up the root directory
const __ROOT_DIR__ = require('path').join(__dirname, '.');

// Create a new application
var app = ApplicationFactory.create(__ROOT_DIR__, new FactoryConfig("/app.json"));


// Start the application
app.addModels(Models);
app.addControllers(Controllers);
app.start();