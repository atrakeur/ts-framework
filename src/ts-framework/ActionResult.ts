import {Response} from "./Http";

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

/**
 * TS-Framework ActionResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
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

/**
 * TS-Framework ContentResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
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

/**
 * TS-Framework JsonResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class JsonResult implements IActionResult
{
    /**
     * Constructor for JsonResult
     * @param {any} data
     */
    constructor(public data: any) {}

    /**
     * Execute the response
     * @param {Response} response
     * @returns {void}
     */
    execute(response: Response): void
    {
        response.sendJson(this.data);
    }
}

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

/**
 * TS-Framework ViewResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class ViewResult implements IActionResult
{
    /**
     * Constructor for ViewResult
     * @param {string} template
     * @param {Object} options
     */
    constructor(public template: string, public options?: Object) {}

    /**
     * Execute the response
     * @param response
     */
    execute(response: Response)
    {
        response.sendView(this.template, this.options);
    }
}
