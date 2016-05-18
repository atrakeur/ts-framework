import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * TS-Framework ContentResult
 * Respond to a request with a raw content
 */
export class ContentResult implements IActionResult
{
    /**
     * Constructor for ContentResult
     * @param {string} content
     * @param {string} contentType
     */
    constructor(public content: string, public contentType?: string) {}

    /**
     * Execute the response
     * @param {Response} response
     * @returns {void}
     */
    execute(response: Response): void
    {
        if (!!this.contentType) {
            response.setContentType(this.contentType);
        }

        response.sendContent(this.content);
    }
}