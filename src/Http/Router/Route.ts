/**
 * Route class
 * Defines a single route in the application
 */
export class Route
{
    //From parameters
    public methods: string[];
    public path: string;

    //Middlewares
    public middlewares: any[];
    
    //To parameters
    public controller: RouteEndpoint;
}

export class RouteEndpoint {
    public controller: any;
    public method: string;

    public static fromString(endpoint) {
        var components = endpoint.split('@');
        if (components.length != 2) {
            throw new Error("RouteEndpoint must follow the form Class@Method");
        }

        var routeEndpoint = new RouteEndpoint();
        routeEndpoint.controller = components[0];
        routeEndpoint.method = components[1];
        return routeEndpoint;
    }

    public static fromStringWithDefaultMethod(endpoint, method) {
        var components = endpoint.split('@');
        if (components.length != 2) {
            var routeEndpoint = new RouteEndpoint();
            routeEndpoint.controller = components;
            routeEndpoint.method = method;
            return routeEndpoint;
        } else {
            var routeEndpoint = new RouteEndpoint();
            routeEndpoint.controller = components[0];
            routeEndpoint.method = components[1];
            return routeEndpoint;
        }
    }

    public toString() {
        if (this.controller instanceof Function) {
            return this.controller.name + '@' + this.method;
        } else if(this.controller instanceof Object) {
            return this.controller.constructor.name + '@' + this.method;
        } else {
            return this.controller + '@' + this.method;
        }
    }
}