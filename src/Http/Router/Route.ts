
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
    public before: string[][];
    public after: string[][];
    
    //To parameters
    public controller: string;
    public method: string;
}