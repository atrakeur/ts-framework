import {Application} from "../ts-framework/Core";

let services = [
    __dirname+"/../ts-framework/Core/ServiceProvider.js",
    __dirname+"/../ts-framework/Http/HttpServiceProvider.js"
];

let app: Application = new Application(__dirname, services);
    app.start();