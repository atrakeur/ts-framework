import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * Respond to a request with a redirect
 */
export class RedirectResult implements IActionResult
{
    /**
     * Constructor for RedirectResult
     * @param {string} url
     * @param {number} status
     */
    public constructor(public url: string, public status: number = 302) {}

    /**
     * Execute the response
     * @param {Response} response
     */
    public execute(response: Response): void
    {
        response.redirect(this.url, this.status);
    }
}