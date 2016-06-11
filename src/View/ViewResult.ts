import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * Respond to a request with a view
 */
export class ViewResult implements IActionResult
{
    /**
     * Constructor for ViewResult
     * @param {string} template
     * @param {Object} options
     */
    constructor(public template: string, public options?: Object) {}

    /**
     * Execute the response
     * @param response
     */
    execute(response: Response)
    {
        //TODO defer with the use of https://github.com/tj/consolidate.js
        //TODO this is to avoid getting too tied with express
        response.sendView(this.template, this.options);
    }
}
