import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";
import * as path from 'path';
import {Inject} from 'huject';
import {ApplicationContract} from "../Contracts/ApplicationContract";

/**
 * TS-Framework DownloadResult
 * Respond to a request with a download
 */
export class DownloadResult implements IActionResult
{

    @Inject("Application")
    private application: ApplicationContract;

    /**
     * Constructor for DownloadResult
     * @param {string} path
     * @param {string} filename
     */
    constructor(public path: string, public filename?: string) {}

    /**
     * Execute the response
     * @param response
     */
    execute(response: Response)
    {
        if (this.filename == null) {
            this.filename = path.basename(this.path);
        }
        response.sendDownload(this.application.getResourcesDirectory() + '/' + this.path, this.filename);
    }
}