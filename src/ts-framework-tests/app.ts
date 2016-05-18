import {Application} from "../ts-framework/Core";

let services = [
    "Core/TSFWServiceProvider.js",
    "Configuration/ConfigurationServiceProvider.js",
    "Controller/ControllerServiceProvider.js",
    "Http/HttpServiceProvider.js"
];

let app: Application = new Application(__dirname, services);
    app.start();