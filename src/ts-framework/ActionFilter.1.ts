import {Reply} from "./Http";
import {Request} from "./Http";
import {Response} from "./Http";
import {IActionResult} from "./ActionResult";

/**
 * TS-Framework application
 * ActionFilter.ts - It can register filters and call Model db functions
 */
export class ActionFilter implements IActionFilter {
    
}

export interface IActionFilter {
    before?(context: IActionFilterContext): void;
    after?(context: IActionFilterContext): void;
}

export interface IActionFilterContext {
    request: Request;
    response: Response;
    reply: Reply;
    next: () => void;
    result?: IActionResult;
}