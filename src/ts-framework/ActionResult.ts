import { Response } from "./Http";

/**
 * TS-Framework ActionResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class RedirectResult implements IActionResult
{
    constructor(public url: string, public status: number = 302) {}
    execute(response: Response) {
        response.express.redirect(this.status, this.url);
    }
}

/**
 * TS-Framework ContentResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class ContentResult implements IActionResult {
    constructor(public content: string, public contentType?: string) {}
    execute(response: Response) {
        if (!!this.contentType) response.express.type(this.contentType);
        response.express.send(this.content);
    }
}

/**
 * TS-Framework JsonResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class JsonResult implements IActionResult {
    constructor(public data: {}) {}
    execute(response: Response) {
        response.express.json(this.data);
    }
}

/**
 * TS-Framework FileResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class FileResult implements IActionResult {
    constructor(public path: string) {}
    execute(response: Response) {
        //TODO - now we need t get root dir from confirugation  
        var file = ""; //path.join(app.root, this.path);
        response.express.sendfile(file);
    }
}

/**
 * TS-Framework DownloadResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class DownloadResult implements IActionResult {
    constructor(public path: string, public filename?: string) {}
    execute(response: Response) {
        //TODO - now we need t get root dir from confirugation  
        var file = ""; //path.join(app.root, this.path); 
        response.express.attachment(file);
        response.express.sendfile(file, this.filename);
    }
}

/**
 * TS-Framework ViewResult
 * This class contains redirect result
 * Methods are calling from ControllerResult, when user want return content from controller
 */
export class ViewResult implements IActionResult {
    constructor(public template: string, public options?: {}) {}
    execute(response: Response) {
        response.express.render(this.template, this.options);
    }
}

export interface IActionResult 
{
    /**      
     * Send Response type
     * @param {Response} response
     */    
    execute(response: Response);
}
