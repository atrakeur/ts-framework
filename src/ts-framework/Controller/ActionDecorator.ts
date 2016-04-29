import { Controller } from "./Controller";

/**
 * Action decorator
 * @param parameters
 * @returns {TypedPropertyDescriptor<any>}
 * @decorator
 */
export function action(parameters = null)
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