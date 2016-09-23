import * as Express from "express";

import {HttpServer} from "../HttpServer";
import {RouteCollection} from "./RouteCollection";
import {Route} from "./Route";
import {Request} from "../Request";
import {Response} from "../Response";
import {IActionResult} from "../../View/IActionResult";

import { Container, Inject } from 'huject'
import { ConfigurationContract } from "../../Contracts/ConfigurationContract";
import {RouterContract} from "../../Contracts/RouterContract";
import {DebugContract} from "../../Contracts/DebugContract";
import {RouteBuilder} from "./RouteBuilder";

/**
 * Router script used to register and dispatch routes
 * Routes must be able to use /path/:id syntax
 */
export class Router implements RouterContract
{
    @Inject("HttpServer")
    private httpServer: HttpServer;

    @Inject("Container")
    private container: Container;

    @Inject("Configuration")
    private configuration: ConfigurationContract;

    @Inject("Debug")
    private debug: DebugContract;

    /**
     * All registered routes
     * @type {Array}
     */
    private routes: RouteCollection = [];

    /**
     * Create a get route
     * @param path
     * @param controller
     * @param action
     */
    public get(path: string, controller: any, action: string): RouteBuilder {
        return this.route(['GET'], path, controller, action);
    }

    /**
     * Create a post route
     * @param path
     * @param controller
     * @param action
     * @returns {undefined}
     */
    public post(path: string, controller: any, action: string) {
        return this.route(['POST'], path, controller, action);
    }

    /**
     * Create a put route
     * @param path
     * @param controller
     * @param action
     * @returns {undefined}
     */
    public put(path: string, controller: any, action: string) {
        return this.route(['PUT'], path, controller, action);
    }

    /**
     * Create a delete route
     * @param path
     * @param controller
     * @param action
     * @returns {undefined}
     */
    public delete(path: string, controller: any, action: string) {
        return this.route(['DELETE'], path, controller, action);
    }

    /**
     * Create a patch route
     * @param path
     * @param controller
     * @param action
     * @returns {undefined}
     */
    public patch(path: string, controller: any, action: string) {
        return this.route(['PATCH'], path, controller, action);
    }

    /**
     * Register a generic route
     * @param methods
     * @param path
     * @param controller
     * @param action
     */
    public route(methods: string[], path:string, controller: any, action: string) {
        var routeBuilder:RouteBuilder = new RouteBuilder(path, methods);

        routeBuilder.toController(controller);
        routeBuilder.toAction(action);
        
        this.routes.push(routeBuilder.getRoute());
        this.attachRouteToServer(routeBuilder.getRoute());

        return routeBuilder;
    }

    /**
     * Attach route to express server
     * @param route
     */
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
        let container = this.container;
        let configuration = this.configuration;
        let debug = this.debug;

        return function (req: Express.Request, res: Express.Response)
        {
            //Display framework version in debug mode
            if (configuration.get("debug")) {
                var tsfwVersion = configuration.get("tsfw-version");
                res.header("X-Powered-By", "TS-Framework "+tsfwVersion);
            } else {
                res.header("X-Powered-By", "TS-Framework");
            }

            //Middleware stack
            var stack: any[] = [];

            let request: Request = new Request();
            request.setFromExpress(req);
            let response: Response = new Response(res);

            //Create controller instance
            container.register("Request", request);
            container.register("Response", response);
            let controller = container.resolve(route.controller.controller);

            //Prepare the callback to go back in the stack and actually send the result
            var send = (result: IActionResult) => {
                //Execute the result returned by controller/last middleware
                if (result !== undefined && result.__proto__.hasOwnProperty("execute") && result.execute instanceof Function) {
                    result.execute(response);
                }
                
                if (stack.length == 0) {
                    //No more middlewares, Send to browser
                    res.end();

                    debug.__DEBUG(`[${req.ip}] (${req.statusCode || 200}) ${req.method} ${req.path}`);
                } else {
                    //execute more Middlewares
                    var middleware = stack.pop();
                    if (middleware.__proto__.hasOwnProperty("after") && middleware.after instanceof Function) {
                        middleware.after(request, response, send);
                    }
                }
            };

            //Prepare the callback to go up in the stack
            var next = () => {
                if (stack.length == route.middlewares.length) {
                    //Set request and responce
                    controller.__setSend(send);

                    // Trigger the action
                    controller[route.controller.method]();
                } else {
                    container.register("Request", request);
                    container.register("Response", response);
                    var middleware = container.resolve(route.middlewares[stack.length]);

                    stack.push(middleware);
                    if (middleware.__proto__.hasOwnProperty("before") && middleware.before instanceof Function) {
                        middleware.before(request, response, next, send);
                    }
                }
            };

            next();
        }
    }

    public printRoutes(): string {
        var table = require("cli-table");
        var headers = ['Methods', 'Path', 'Action', 'Middleware'];

        var instance = new table({head: headers});

        for(var routeName in this.routes) {
            var route = [];
            
            route.push(this.routes[routeName].methods);
            route.push(this.routes[routeName].path);
            route.push(this.routes[routeName].controller.toString());

            route.push(this.routes[routeName].middlewares.map(function(elem){
                return elem.name;
            }).join(","));

            instance.push(route);
        }

        return instance.toString();
    }
}
