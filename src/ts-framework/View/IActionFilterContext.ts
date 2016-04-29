import {IActionResult} from "./IActionResult";
import {Request} from "../Http/Request";
import {Response} from "../Http/Response";

export interface IActionFilterContext
{
    request: Request;
    response: Response;
    next: () => void;
    result?: IActionResult;
}