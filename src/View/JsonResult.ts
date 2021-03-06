import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * Respond to a request with a json payload
 */
export class JsonResult implements IActionResult
{
    /**
     * Constructor for JsonResult
     * @param {any} data
     */
    constructor(public data: any) {}

    /**
     * Execute the response
     * @param {Response} response
     * @returns {void}
     */
    execute(response: Response): void
    {
        response.sendJson(this.data);
    }
}