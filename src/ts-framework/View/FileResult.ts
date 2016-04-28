import {IActionResult} from "./IActionResult";
import {Response} from "../Http/Response";

/**
 * TS-Framework FileResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
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
        let file = ""; //path.join(app.root, this.path); // @todo Now we need to get root dir from the application
        response.sendFile(file);
    }
}