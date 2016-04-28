import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * TS-Framework JsonResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
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