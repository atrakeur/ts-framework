import {ServiceProvider} from "../Core/ServiceProvider";

import {AutoLoader} from "../Core/AutoLoader";
import {Container, Inject} from "huject";
import {RouterContract} from "../Contracts/RouterContract";
import {LoaderContract} from "../Contracts/LoaderContract";

/**
 * Service provider to bootstrap all controllers
 *
 * The goal of this class is to bootstrap all controllers
 * On startup we scan all registered directories to look for files ending with Controller
 * If the file contains a class anotated with @Controller, we load it
 */
export class ControllerServiceProvider extends ServiceProvider {

    private controllersPaths = "controllers/";

    boot(container:Huject.Container) {
        //Nothing to do before the framework is booted
        var autoloader: AutoLoader = container.resolve("AutoLoader");
        autoloader.registerLoader(container.resolve(ControllerLoader));
    }

    start(container:Huject.Container) {
        //Lookup controllers and load them
        var autoloader: AutoLoader = container.resolve("AutoLoader");
        autoloader.loadDirectory(this.controllersPaths);
    }

}

export class ControllerLoader implements LoaderContract {

    @Inject("Container")
    private container : Container;

    loadModule(name:string, module:any):void {
        //The object is a service provider
        if (module.prototype.decorate && module.prototype.decorate.controller) {
            //Register to the IoC
            this.container.register(name, module);

            //Register annotated routes
            var router: RouterContract = this.container.resolve("Router");
            var controller = this.container.resolve(name);
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
        }
    }

}