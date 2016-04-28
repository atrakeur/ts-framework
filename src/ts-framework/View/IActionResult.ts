import {Response} from "../Http/Response";

/** IActionResult interface for a response */
export interface IActionResult
{
    /**
     * Access to prototype properties
     * This is a hack as TypeScript doesn't allow us access to it
     */
    __proto__?: any;

    /**
     * Send Response type
     * @param {Response} response
     */
    execute(response: Response);
}