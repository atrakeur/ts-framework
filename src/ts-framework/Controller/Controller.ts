import {ActionFilter} from "../View/ActionFilter";
import {IActionFilter} from "../View/IActionFilter";
import {IActionFilterContext} from "../View/IActionFilterContext";

/**
 * TS-Framework application
 * Defines a base controller: ie some code that is called to handle a given request
 */
export class Controller
{
    /**
     * TypeScript won't recognise 'prototype' on classes
     * This is a hack to get around it, don't ask me why.
     */
    public __proto__: any;

    /**
     * Parameters Decorator Action
     */
    public decorate: Object;

    /**
     * Array IActionFilter
     * @deprecated
     * @type IActionFilter[]
    */
    private filters: IActionFilter[];

    /**
     * Register filter before action
     * @deprecated
     * @param {IActionFilterContext} actionFilter
     * @return IActionFilter
    */
    public static registerFilterBefore(actionFilter: IActionFilterContext) : IActionFilter
    {
        return new ActionFilter();
    }

    /**
     * Register filter after action
     * @deprecated
     * @param {IActionFilterContext} actionFilter
     * @return IActionFilter
    */
    public static registerFilterAfter(actionFilter: IActionFilterContext) : IActionFilter
    {
        return new ActionFilter();
    }

    /**
     * Register filter action
     * @deprecated
     * @param {IActionFilterContext} actionFilter
     * @return IActionFilter
    */
    public static registerFilter(actionFilter: IActionFilterContext) : IActionFilter
    {
        return new ActionFilter();
    }
}