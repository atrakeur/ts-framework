import {ActionFilter, IActionFilter, IActionFilterContext} from "./ActionFilter";
import {Request, Response} from "./Http";
import {Error} from "./Exception";

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
    public decorate: Object;

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

/**
 * TS-Framework application
 * DataModelController.ts - Register methods for communication with ORM
 * extends Controller
 */
export class DataModelController extends Controller
{
    /**
     * Create new Object
     */
    public create()
    {
        // ...
    }

    /**
     * Update Object specified with ID
     * @param {string} id
     */
    public update(id: string)
    {
        // ...
    }
    
    /**
     * Delete Object specified with ID
     * @param {string} id
    */
    public delete(id: string)
    {
        // ...
    }
    
    /**
     * Find object by id
     * @param {string} id
     */
    public find(id: string)
    {
        // ...
    }
}

/**
 * Collection of controllers
 * @format string -> controller
 */
export type ControllerCollection = {[s: string]: Controller};


/**
 * Action decorator
 * @param parameters
 * @returns {TypedPropertyDescriptor<any>}
 * @decorator
 */
export function action(parameters: Object = null)
{
    return function (target:Controller, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
        if (parameters) {
            var aux = {};
            if (target.decorate)
                aux = target.decorate;
            aux[propertyKey] = parameters;
            target.decorate = aux;
        }

        return descriptor;
    };
}