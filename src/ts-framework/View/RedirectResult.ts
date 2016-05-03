import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * TS-Framework ActionResult
 * This class contains redirect result
 * Methods are calling from HttpController, when user want return content from controller
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