import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * TS-Framework DownloadResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
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
        let file = ""; //path.join(app.root, this.path); // @todo Now we need to get root dir from the application
        response.sendDownload(file, this.filename);
    }
}