import {ActionFilter} from "../View/ActionFilter";
import {IActionDecorator} from "./IActionDecorator";
import {IActionFilter} from "../View/IActionFilter";
import {IActionFilterContext} from "../View/IActionFilterContext";
import {Request} from "../Http/Request";
import {Response} from "../Http/Response";

/**
 * TS-Framework application
 * Controller.ts - It can register filters and call Model db functions
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
    public decorate: IActionDecorator;

    /**
     * The request made by the client
     * @type {Request}
     */
    protected request: Request;

    /**
     * Response sent by the controller action
     * @type {Response}
     */
    protected response: Response;


    /** 
     * Array IActionFilter
     * @type IActionFilter[]
    */
    private filters: IActionFilter[];
    
    /**
     * Register filter before action
     * @param {IActionFilterContext} actionFilter
     * @return IActionFilter
    */
    public static registerFilterBefore(actionFilter: IActionFilterContext) : IActionFilter 
    {
        return new ActionFilter();
    }
    
    /**
     * Register filter after action
     * @param {IActionFilterContext} actionFilter
     * @return IActionFilter
    */
    public static registerFilterAfter(actionFilter: IActionFilterContext) : IActionFilter 
    {
        return new ActionFilter();
    }
    
    /**
     * Register filter action
     * @param {IActionFilterContext} actionFilter
     * @return IActionFilter
    */
    public static registerFilter(actionFilter: IActionFilterContext) : IActionFilter 
    {
        return new ActionFilter();
    }

    /**
     * Sets the request of the client requesting the resource
     * @param {Request} request
     * @private
     */
    public __setRequest(request: Request): void
    {
        this.request = request;
    }

    /**
     * Sets the response the server will return to the client
     * @param {Response} response
     * @private
     */
    public __setResponse(response: Response): void
    {
        this.response = response;
    }
}