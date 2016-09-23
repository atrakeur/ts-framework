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