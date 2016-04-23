/// <reference path="../../typings/main.d.ts" />
import * as Express from "express";

import {__DEBUG} from "./Application";
import {Reflection} from "./Reflection";
import {RequestMethod, Response, Request} from "./Http";
import {Controller, ControllerCollection} from "./Controller";
import {IActionResult} from "./ActionResult";


/**
 * Route class
 * Defines a single route in the application
 */
export class Route
{
    public path: string;
    public action: string;
    public methods: Array<RequestMethod>;
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
    public registerRoutes(controllers: ControllerCollection, express: Express.Application)
    {
        __DEBUG("");

        // Register all routes
        for (let name in controllers)
        {
            console.log(controllers[name].__proto__.decorate);
            if (controllers.hasOwnProperty(name)) {
                Object.getOwnPropertyNames(controllers[name].__proto__).forEach(action => {
                    if (action === "constructor") return;
                    if (action === "decorate") return;

                    var decorate = {
                        path: null,
                        method: null
                    };
                    if (controllers[name].__proto__.decorate) {
                        if (controllers[name].__proto__.decorate[action])
                            decorate = controllers[name].__proto__.decorate[action];
                    }

                    let path = (name   === "index") ? `/`       : `/${name}`;
                    if (decorate.path) {
                        path = decorate.path;
                    } else {
                        path = (action === "index") ? `${path}` : `${path}/${action}`;
                    }

                    var method = (decorate.method) ? decorate.method : ['GET'];

                    let route = new Route();
                    route.path = path;
                    route.action = action;
                    route.methods = method;
                    route.controller = controllers[name];
                    route.parameters = Reflection.getFunctionArguments(controllers[name][action]);

                    // Attach the route to express
                    this.attachRoute(express, route);

                    // Debug message
                    __DEBUG(`Registered route: ${path} (controller = ${name}, action = ${action}, methods = ${route.methods})`);
                });
            }
        }
    }

    private attachRoute(express: Express.Application, route: Route): void
    {
        route.methods.forEach(method => {
            express[method.toLowerCase()](route.path, this.dispatch(route));
        });
    }

    /**
     * Method that actually handles a request
     * @returns {Function}
     */
    private dispatch(route: Route): Function
    {
        return function (req: Express.Request, res: Express.Response, next: Function)
        {
            res.header("X-Powered-By", "TS-Framework");

            // Request parameters don't match target?
                // Dispatch 404
            // else
                // Get parameters

            let request: Request = new Request(req);
            let response: Response = new Response(res);
            route.controller.__setRequest(request);
            route.controller.__setResponse(response);

            // Trigger the action
            let result: IActionResult = route.controller[route.action](/* parameters */);

            // IActionResult was returned
            if (
                result !== undefined &&
                result.__proto__.hasOwnProperty("execute") &&
                result.execute instanceof Function
            ) {
                result.execute(response);
            } else {
                res.end();
            }

            // Log request
            __DEBUG(`[${req.ip}] (${req.statusCode || 200}) ${req.method} ${req.path}`);
        }
    }
}
