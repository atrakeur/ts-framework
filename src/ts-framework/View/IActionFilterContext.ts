import {Request} from "../Http/Request";
import {Response} from "../Http/Response";
import {IActionResult} from "./IActionResult";

export interface IActionFilterContext
{
    request: Request;
    response: Response;
    next: () => void;
    result?: IActionResult;
}