/**
 * Action decorator
 * @param parameters
 * @returns {TypedPropertyDescriptor<any>}
 * @decorator
 */
export function action(parameters: any = {})
{
    console.log("The decorator parameters are: " + JSON.stringify(parameters)); // pre
    return function (target:Object, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
        let originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            console.log("The decorator parameters are: " + JSON.stringify(parameters)); // pre
            console.log("The method args are: " + JSON.stringify(args)); // pre
            let result = originalMethod.apply(this, args); // run and store the result
            console.log("The return value is: " + result); // post
            return result; // return the result of the original method
        };

        return descriptor;
    };
}

/**
 * Required decorator
 * @param target
 * @param propertyKey
 * @param parameterIndex
 * @returns {any}
 * @decorator
 */
export function required(target: Object, propertyKey: string | symbol, parameterIndex: any) {
    console.log(parameterIndex);
    if (parameterIndex != undefined) {
        return parameterIndex;
    } else {
        throw new Error(`Parameter ${propertyKey} is required!`);
    }
}