import {Route, RouteEndpoint} from "./Route";

export class RouteBuilder {

    private route: Route;

    public constructor(path: string, methods: string[]) {
        this.route = new Route();
        this.route.methods = methods;
        this.route.path = path;
        this.route.controller = new RouteEndpoint();
        this.route.middlewares = [];
    }

    public toController(controller: any): RouteBuilder {
        this.route.controller.controller = controller;
        return this;
    }

    public toAction(action: any): RouteBuilder {
        this.route.controller.method = action;
        return this;
    }

    public middleware(middleware: any) {
        this.route.middlewares.push(middleware);
        return this;
    }

    public getRoute(): Route {
        return this.route;
    }

}