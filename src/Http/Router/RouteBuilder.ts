import {Route} from "./Route";
export class RouteBuilder {

    private route: Route;

    public constructor(path: string, methods: string[]) {
        this.route = new Route();
        this.route.methods = methods;
        this.route.path = path;
    }

    public toController(controller: string): RouteBuilder {
        this.route.controller = controller;
        return this;
    }

    public toMethod(method: string): RouteBuilder {
        this.route.method = method;
        return this;
    }

    public toAction(controller:string): RouteBuilder {
        var components = controller.split('@');
        if (components.length != 2) {
            throw new Error("Route must follow the form Controller@Method");
        }

        return this.toController(components[0]).toMethod(components[1]);
    }

    public before(middleware: string[]): RouteBuilder {
        middleware.forEach((value, index, array) => {
            var components = value.split('@');
            if (components.length == 2) {
                var object = components[0];
                var method = components[1];
            } else {
                var object = value;
                var method = "before";
            }

            var middlewareData = [];
            middlewareData.push(object);
            middlewareData.push(method);
            this.route.before.push(middlewareData)
        });
        return this;
    }

    public after(middleware: string[]): RouteBuilder {
        middleware.forEach((value, index, array) => {
            var components = value.split('@');
            if (components.length == 2) {
                var object = components[0];
                var method = components[1];
            } else {
                var object = value;
                var method = "after";
            }

            var middlewareData = [];
            middlewareData.push(object);
            middlewareData.push(method);
            this.route.after.push(middlewareData)
        });
        return this;
    }

    public middleware(middleware: string[]) {
        middleware.forEach((value, index, array) => {
            var components = value.split('@');
            if (components.length == 2) {
                throw new Error("");
            }

            this.before([value]).after([value]);
        });
        return this;
    }

    public getRoute(): Route {
        return this.route;
    }

}