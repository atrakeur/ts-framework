/// <reference path="../../typings/main.d.ts" />

import {Reflection} from "./Reflection";
import {Controller, ControllerCollection} from "./Controller";
import {Application, __DEBUG} from "./Application";


/**
 * Route class
 * Defines a single route in the application
 */
export class Route
{
    public path: string;
    public action: string;
    public controller: Controller;
    public parameters: string[];
}

/**
 * Collection of routes identified by a string (path)
 * @type {Object}
 */
export type RouteCollection = {[s:string]: Route};

/**
 * Router script used to register and dispatch routes
 * Routes must be able to use /path/:id syntax
 */
export class Router
{
    /**
     * All registered routes
     * @type {Array}
     */
    public routes: RouteCollection = {};

    /**
     * Register routes by passing a collection of controllers to it
     * @param {ControllerCollection} controllers
     * @returns {void}
     */
    public registerRoutes(controllers: ControllerCollection)
    {
        __DEBUG("");

        for (let name in controllers)
        {
            Object.getOwnPropertyNames(controllers[name].__proto__).forEach(action => {
                if (action === "constructor") return;

                let path = (name   === "index") ? `/`       : `/${name}`;
                    path = (action === "index") ? `${path}` : `${path}/${action}`;

                let route = new Route();
                    route.path = path;
                    route.action = action;
                    route.controller = controllers[name];
                    route.parameters = Reflection.getFunctionArguments(controllers[name][action]);

                this.routes[path] = route;

                __DEBUG(`Registered route: ${path} (controller = ${name}, action = ${action})`);
            });
        }
    }

    public dispatch(path: string)
    {
        
    }
}