import {ActionFilter, IActionFilter, IActionFilterContext} from "./ActionFilter";
import {Request, Response} from "./Http";

/**
 * TS-Framework application
 * Controller.ts - It can register filters and call Model db functions
 */
export class Controller
{
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
 * Action decorator (no arguments)
 * @param target
 * @param propertyKey
 * @param descriptor
 * @returns {TypedPropertyDescriptor<any>}
 * @decorator
 */
export function action(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>)
{
    let originalMethod = descriptor.value; // save a reference to the original method

    // @todo Allow for simple reading of the actions within the descriptor

    return descriptor;
}