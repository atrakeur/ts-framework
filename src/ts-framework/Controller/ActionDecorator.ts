import { Controller } from "./Controller";
import { IActionDecorator } from "./IActionDecorator";

/**
 * Action decorator
 * @param parameters
 * @returns {TypedPropertyDescriptor<any>}
 * @decorator
 */
export function action(parameters: IActionDecorator = null)
{
    return function (target:Controller, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
        if (parameters) {
            var aux: IActionDecorator;
            if (target.decorate)
                aux = target.decorate;
            aux[propertyKey] = parameters;
            target.decorate = aux;
        }

        return descriptor;
    };
}