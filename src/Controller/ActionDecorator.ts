import Inject = Huject.Inject;
import { Controller } from "./Controller";
import {RouterContract} from "../Core/Contracts/RouterContract";

/**
 * Annotate controller actions with some properties
 *
 * @param parameters
 * @returns {function(Controller, string, TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>}
 */
export function action(parameters = null)
{

    return function (target:Controller, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
        //Ensure the decorator object is set
        if (target.constructor.prototype.decorate == null) {
            target.constructor.prototype.decorate = {}
        }

        //Add parameters to decorator
        if (!target.decorate['routes']) {
            target.decorate['routes'] = {};
        }
        if (!target.decorate['routes'][propertyKey]) {
            target.decorate['routes'][propertyKey] = {};
        }

        if (parameters) {
            for (var param in parameters) {
                target.decorate['routes'][propertyKey][param] = parameters[param];
            }
        }

        return descriptor;
    };
}