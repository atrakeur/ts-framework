import {ActionFilter, IActionFilter, IActionFilterContext} from "./ActionFilter";

/**
 * TS-Framework application
 * Controller.ts - It can register filters and call Model db functions
 */
export class Controller {
    
    /** 
     * Array IActionFilter
     * @type IActionFilter[]
    */
    private filters: IActionFilter[];
    
    /**
     * Register filter before action
     * @param {IActionFilterContext} actionFilter
    */
    public registerFilterBefore(actionFilter: IActionFilterContext) : IActionFilter {
        //...
        return new ActionFilter();
    }
    
    /**
     * Register filter after action
     * @param {IActionFilterContext} actionFilter
    */
    public registerFilterAfter(actionFilter: IActionFilterContext) : IActionFilter {
        //...
        return new ActionFilter();
    }
    
    /**
     * Register filter action
     * @param {IActionFilterContext} actionFilter
    */
    public registerFilter(actionFilter: IActionFilterContext) : IActionFilter {
        //...
        return new ActionFilter();
    }
}

/**
 * TS-Framework application
 * DataModelController.ts - Register methods for communication with ORM
 * extends Controller
 */
export class DataModelController extends Controller {
    
    /**
     * Create new Object
    */
    public create() {
        
    }
    
    /**
     * Update Object specificed with ID
     * @param {string}
    */
    public update(id: string) {
        
    }
    
    /**
     * Delete Object specificed with ID
     * @param {string}
    */
    public delete(id: string) {
        
    }
    
    /**
     * Create new Object
     * @param {string}
    */
    public find(id: string) {
        
    }
}