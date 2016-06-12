import {Inject} from 'huject';
import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";
import * as path from 'path';
import {ApplicationContract} from "../Contracts/ApplicationContract";

/**
 * TS-Framework FileResult
 * Respond to a request with a file
 */
export class FileResult implements IActionResult
{
    @Inject("Application")
    private application: ApplicationContract;

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
        response.sendFile(this.application.getResourcesDirectory() + '/' + this.path);
    }
}