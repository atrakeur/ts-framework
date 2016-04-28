import {IActionFilterContext} from "./IActionFilterContext";

export interface IActionFilter
{
    before?(context: IActionFilterContext): void;
    after?(context: IActionFilterContext): void;
}