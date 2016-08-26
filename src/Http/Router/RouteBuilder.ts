import {Route, RouteEndpoint} from "./Route";
export class RouteBuilder {

    private route: Route;

    public constructor(path: string, methods: string[]) {
        this.route = new Route();
        this.route.methods = methods;
        this.route.path = path;
        this.route.before = [];
        this.route.after = [];
    }

    public toAction(controller:string): RouteBuilder {
        this.route.controller = RouteEndpoint.fromString(controller);
        return this;
    }

    public before(middleware: string): RouteBuilder {
        var endpoint = RouteEndpoint.fromStringWithDefaultMethod(middleware, "before");
        this.route.before.push(endpoint);
        return this;
    }

    public after(middleware: string): RouteBuilder {
        var endpoint = RouteEndpoint.fromStringWithDefaultMethod(middleware, "after");
        this.route.after.push(endpoint);
        return this;
    }

    public middleware(middleware: string) {
        var components = middleware.split('@');
        if (components.length == 2) {
            throw new Error("You can't specify a method when declaring both before and after middleware");
        }

        this.before(middleware).after(middleware);
        return this;
    }

    public getRoute(): Route {
        return this.route;
    }

}