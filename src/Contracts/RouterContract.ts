/**
 * Defines a common interfaces for a given router
 * A router must handle binding a method/path to a given controller method
 */
export interface RouterContract {

    get(path: string, controller: any, action: string);
    post(path: string,  controller: any, action: string);
    put(path: string, controller: any, action: string);
    delete(path: string, controller: any, action: string);
    patch(path: string, controller: any, action: string);
    route(methods: string[], path:string, controller: any, action: string);

    /**
     * Print routes to a string
     */
    printRoutes(): string;

}
