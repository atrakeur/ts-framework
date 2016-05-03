import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * TS-Framework ViewResult
 * This class contains redirect result
 * Methods are calling from HttpController, when user want return content from controller
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
        response.sendView(this.template, this.options);
    }
}
