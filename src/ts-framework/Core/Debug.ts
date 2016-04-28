import {Application} from "./Application";

/**
 * Debug method, wrapper for console.log() only when the application is in 'development' mode
 * @param {any[]} args
 * @private
 */
export function __DEBUG(...args: any[])
{
    if (Application.getEnvironment() === "development") {
        args.unshift("[DEBUG]");
        console.log.apply(null, args);
    }
}