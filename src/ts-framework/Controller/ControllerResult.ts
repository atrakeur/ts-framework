import { RedirectResult, ContentResult, JsonResult, FileResult, DownloadResult, ViewResult } from "./ActionResult";

/**
 * TS-Framework ControllerResult
 * This class containt methods, which are callable from controller.
 * It allow send response back to User
 */
export class ControllerResult 
{
    constructor(public send: (IActionResult) => void) {}

    /**
     * Clasic redirect type
     * @param {string} url
     * @param {number} status
    */
    redirect(url: string, status: number = 302) {
        this.send(new RedirectResult(url, status));
    }

    /**
     * Send string content
     * @param {string} text
     * @param {string?} contentType
    */
    content(text: string, contentType?: string) {
        this.send(new ContentResult(text, contentType));
    }

    /**
     * Send json content     
     * @param {} data
    */
    json(data: {}) {
        this.send(new JsonResult(data));
    }
    
    /**
     * Send file content
     * @param {string} path     
    */
    file(path: string) {
        this.send(new FileResult(path));
    }
    
    /**
     * Send download response
     * @param {string} path
     * @param {string?} filename
    */
    download(path: string, filename?: string) {
        this.send(new DownloadResult(path, filename));
    }

    /**
     * Send view
     * @param {string} template
     * @param {?} options
    */
    view(template: string, options?: {}) {
        var result = new ViewResult(template);
        if (options) result.options = options;
        this.send(result);
    }
}