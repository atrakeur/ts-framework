import {Application} from "../Core/Application";
import {ServiceProvider} from "../Core/ServiceProvider";

import * as fs from "fs";
import * as pathUtils from "path";
import * as _ from "lodash";
import {AutoLoader} from "../Core/AutoLoader";
import {Controller} from "./Controller";
import Container = Huject.Container;
import {RouterContract} from "../Core/Contracts/RouterContract";

/**
 * Service provider to bootstrap all controllers
 *
 * The goal of this class is to bootstrap all controllers
 * On startup we scan all registered directories to look for files ending with Controller
 * If the file contains a class anotated with @Controller, we load it
 */
export class ControllerServiceProvider extends ServiceProvider {

    private controllersPaths = "/app/controllers/";

    boot(container:Huject.Container) {
        //Nothing to do before the framework is booted
    }

    start(app:Application, container:Huject.Container) {
        //Lookup controllers and load them
        var autoloader: AutoLoader = container.resolve("AutoLoader");
        var lookupPaths = autoloader.getLookupPath();

        //Parse all default lookup path with the Controllers suffix
        lookupPaths.forEach((path: string) => {
            let fullpath = path + this.controllersPaths;

            if (fs.existsSync(fullpath)) {
                var filenames:string[] = fs.readdirSync(fullpath);

                //Try to load all files in paths
                filenames.forEach((filename) => {
                    //Enforce convention to terminate files with Controller.js
                    if (_.endsWith(filename, "Controller.js")) {
                        this.loadController(fullpath + filename, container);
                    }
                });
            }
        });
    }

    private loadController(filename: string, container: Container) {
        // Load file, execute all annotations
        let module: Object = require(filename);
        let debug = container.resolve("Debug");

        //loop over the object to find possible candidates
        for (let name in module)
        {
            if (module.hasOwnProperty(name))
            {
                //The object is a service provider
                if (module[name].prototype instanceof Controller) {
                    //Register to the IoC
                    container.register(name, module[name]);

                    //Register annotated routes
                    var router: RouterContract = container.resolve("Router");
                    var controller = container.resolve(name);
                    for (var route in controller.decorate.routes) {
                        //Extract value from decorators or use defaults
                        var controllerPath = (controller.decorate.path ? controller.decorate.path: name.replace("Controller", "").toLowerCase());
                        var actionPath = (controller.decorate.routes[route].path ? controller.decorate.routes[route].path: route);
                        var methods = (controller.decorate.routes[route].method ? controller.decorate.routes[route].method : ['GET']);

                        //Transform indexes to nothing (well to act like an index..)
                        controllerPath = controllerPath.replace("Index", "/").replace("index", "/");
                        actionPath     = actionPath.replace("Index", "/").replace("index", "/");

                        var fullPath = controllerPath + actionPath;
                        fullPath = fullPath.replace("//", "/");  //Fixes multiples useless slashes

                        //Register route from path using the ControllerClass@method syntax
                        router.route(methods, fullPath, name+"@"+route);
                    }

                    continue;
                }

                // Something is terribly wrong
                return module;
            }
        }
    }

}