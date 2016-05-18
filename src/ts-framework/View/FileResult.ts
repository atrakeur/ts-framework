import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";
import * as path from 'path';

/**
 * TS-Framework FileResult
 * Respond to a request with a file
 */
export class FileResult implements IActionResult
{
    /**
     * Constructor for FileResult
     * @param {string} path
     */
    constructor(public path: string) {}

    /**
     * Execute the response
     * @param {Response} response
     * @returns {void}
     */
    execute(response: Response): void
    {
        //TODO check that filename uses a pretty syntax relative to app root
        let file = path.basename(this.path);
        response.sendFile(file);
    }
}