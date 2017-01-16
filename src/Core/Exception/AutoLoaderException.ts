import {Exception} from "./Exception";

/**
 * Custom auto-loader exception
 * @type {Exception}
 */
export class AutoLoaderException extends Exception
{
    public name = "AutoLoaderException";

    constructor (public message: string)
    {
        super(message);
    }
}