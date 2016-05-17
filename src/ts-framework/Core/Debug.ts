import {Application} from "./Application";


export function __INFO(...args: any[])
{
    __PRINT("INFO", args);
}

export function __WARNING(...args: any[])
{
    __PRINT("WARNING", args);
}

/**
 * Debug method, wrapper for console.log() only when the application is in 'development' mode
 * @param {any[]} args
 * @private
 */
export function __DEBUG(...args: any[])
{
    __PRINT("DEBUG", args);
}


export function __ERROR(...args: any[])
{
    __PRINT("ERROR", args);
}

export function __PRINT(severity: string, ...args: any[]) {

    if (Application.getEnvironment() === "development") {
        args.unshift("["+severity+"]");
        console.log.apply(null, args);
    }
}