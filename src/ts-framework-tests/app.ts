import {Application} from "../ts-framework/Core";

let services = [
    "Core/ServiceProvider.js",
    "Http/HttpServiceProvider.js"
];

let app: Application = new Application(__dirname, services);
    app.start();