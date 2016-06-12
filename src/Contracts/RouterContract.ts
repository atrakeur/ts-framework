/**
 * Defines a common interfaces for a given router
 * A router must handle binding a method/path to a given controller method
 */
export interface RouterContract {

    get(path: string, action: string);
    post(path: string, action: string);
    put(path: string, action: string);
    delete(path: string, action: string);
    patch(path: string, action: string);
    route(methods: string[], path:string, action: string);

    /**
     * Print routes to a string
     */
    printRoutes(): string;

}
