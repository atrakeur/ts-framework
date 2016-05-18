import * as Express from "express";

import {__DEBUG} from "../../Core/Debug";
import {HttpServer} from "../HttpServer";
import {RouteCollection} from "./RouteCollection";
import {Route} from "./Route";
import {Request} from "../Request";
import {Response} from "../Response";
import {IActionResult} from "../../View/IActionResult";

import { Container, Inject } from 'huject'
import {__INFO} from "../../Core/Debug";

/**
 * Router script used to register and dispatch routes
 * Routes must be able to use /path/:id syntax
 */
export class Router
{
    @Inject("HttpServer")
    private httpServer: HttpServer;

    @Inject("Container")
    private container: Container;

    /**
     * All registered routes
     * @type {Array}
     */
    public routes: RouteCollection = {};

    /**
     * Register a route
     * @param methods
     * @param path
     * @param action
     */
    public registerRoute(methods: string[], path:string, action: string) {
        let route = new Route();
        route.methods = methods;
        route.path = path;
        route.action = action;

        this.routes[path] = route;

        this.attachRouteToServer(route);

        // Debug message
        __DEBUG(`Registered route: ${methods} ${path} to ${action}`);
    }

    private attachRouteToServer(route: Route): void
    {
        route.methods.forEach(method => {
            var express = this.httpServer.getExpress();
            express[method.toLowerCase()](route.path, this.dispatch(route));
        });
    }

    /**
     * Method that actually handles a request
     * @returns {Function}
     */
    private dispatch(route: Route): Function
    {
        var container = this.container;
        return function (req: Express.Request, res: Express.Response, next: Function)
        {
            res.header("X-Powered-By", "TS-Framework");

            // Request parameters don't match target?
            // Dispatch 404
            // else
            // Get parameters

            //Create a copy of the controller
            var controller = container.resolve(route.getController());

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
            controller[route.getMethod()]();
        }
    }
}
