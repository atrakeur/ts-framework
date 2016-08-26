
import {Exception} from "../../Core/Exception/Exception";

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
    public before: RouteEndpoint[];
    public after: RouteEndpoint[];
    
    //To parameters
    public controller: RouteEndpoint;
}

export class RouteEndpoint {
    public controller: string;
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
        return this.controller + '@' + this.method;
    }
}