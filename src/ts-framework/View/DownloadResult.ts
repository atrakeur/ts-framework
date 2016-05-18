import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";
import * as path from 'path';

/**
 * TS-Framework DownloadResult
 * Respond to a request with a download
 */
export class DownloadResult implements IActionResult
{
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
        //TODO check that filename uses a pretty syntax relative to app root
        let file = path.basename(this.path);
        response.sendDownload(file, this.filename);
    }
}