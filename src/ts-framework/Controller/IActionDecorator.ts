import {RequestMethod} from "../Http/RequestMethod";

export interface IActionDecorator {
    path: string;
    method: Array<RequestMethod>;
}
