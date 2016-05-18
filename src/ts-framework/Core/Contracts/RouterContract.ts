/**
 * Defines a common interfaces for a given router
 * A router must handle binding a method/path to a given controller method
 */
export interface RouterContract {

    registerRoute(method: string, path:string, controller: string);

}
