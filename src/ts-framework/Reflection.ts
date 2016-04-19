let getParameterNames = require("get-parameter-names");

/**
 * Reflection helper class
 */
export class Reflection
{
    /**
     * Get a function's argument names as a string array
     * @param {Function} method
     * @returns {string[]}
     */
    public static getFunctionArguments(method: Function): string[]
    {
        return getParameterNames(method);
    }

    /**
     * Get the name of a class/function
     * @param {Function} method
     * @returns {string}
     */
    public static getFunctionName(method: Function): string
    {
        return method.prototype.constructor.name;
    }
}