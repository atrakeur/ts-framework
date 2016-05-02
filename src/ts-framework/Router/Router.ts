/// <reference path="../../../typings/main.d.ts" />
import * as Express from "express";

import {__DEBUG} from "../Core/Debug";
import {Action} from "../Controller/Action";
import {ControllerCollection} from "../Controller/ControllerCollection";
import {IActionResult} from "../View/IActionResult";
import {Reflection} from "../Core/Reflection";
import {Response} from "../Http/Response";
import {Request} from "../Http/Request";
import {RequestMethod} from "../Http/RequestMethod";
import {Route} from "./Route";
import {RouteCollection} from "./RouteCollection";
import {HttpController} from "../Controller/HttpController";

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
     * @param express
     * @returns {void}
     */
    public registerRoutes(controllers: ControllerCollection, express: Express.Application)
    {
        __DEBUG("");

        // Register all routes
        for (let name in controllers)
        {
            if (controllers.hasOwnProperty(name)) {
                Object.getOwnPropertyNames(controllers[name].__proto__).forEach(action => {
                    if (action === "constructor") return;
                    if (action === "decorate") return;

                    var decorate = new Action();
                    if (controllers[name].__proto__.decorate) {
                        if (controllers[name].__proto__.decorate[action])
                            decorate = controllers[name].__proto__.decorate[action];
                    }

                    let path: string = (name === "index") ? `/` : `/${name}`;
                    if (decorate.hasOwnProperty('path')) {
                        path = decorate.path;
                    } else {
                        path = (action === "index") ? `${path}` : `${path}/${action}`;
                    }

                    var method: Array<RequestMethod> = (decorate.hasOwnProperty('method')) ? decorate.method : ['GET'];

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

            //Create a copy of the controller
            //TODO move that to the autoloader
            var controller = <HttpController>{};
            for (var attribut in route.controller) {
                //if (route.controller.hasOwnProperty(attribut)) {
                    controller[attribut] = route.controller[attribut];
                //}
            }

            //Set request and responce
            let request: Request = new Request(req);
            let response: Response = new Response(res);
            controller.__setRequest(request);
            controller.__setResponse(response);

            //Prepare the callback to actually send the result
            var send = (result: IActionResult) => {
                // IActionResult was returned, end the request
                if (
                    result !== undefined &&
                    result.__proto__.hasOwnProperty("execute") &&
                    result.execute instanceof Function
                ) {
                    result.execute(response);
                } else {
                    res.end();
                }

                //Log it
                __DEBUG(`[${req.ip}] (${req.statusCode || 200}) ${req.method} ${req.path}`);
            };
            controller.__setSend(send);

            // Trigger the action
            //TODO move that to the autoloader
            controller[route.action]();
        }
    }
}
