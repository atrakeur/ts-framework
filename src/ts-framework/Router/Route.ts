import {Controller} from "../Controller/Controller";
import {RequestMethod} from "../Http/RequestMethod";

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