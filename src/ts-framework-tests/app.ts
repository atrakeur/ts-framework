import {Application} from "../ts-framework/Core";

let services = [
    "Core/TSFWServiceProvider.js",
    "Http/HttpServiceProvider.js",
    "Controller/ControllerServiceProvider.js"
];

let app: Application = new Application(__dirname, services);
    app.start();