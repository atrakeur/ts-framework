import {Application} from "./Application";


export function __INFO(...args: any[])
{
    if (Application.getEnvironment() === "dev") {
        __PRINT("INFO", args);
    }
}

export function __DEBUG(...args: any[])
{
    if (Application.getEnvironment() === "dev") {
        __PRINT("DEBUG", args);
    }
}

export function __WARNING(...args: any[])
{
    __PRINT("WARNING", args);
}

export function __ERROR(...args: any[])
{
    __PRINT("ERROR", args);
}

export function __PRINT(severity: string, ...args: any[])
{
    args.unshift("["+severity+"]");
    console.log.apply(null, args);
}