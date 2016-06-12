import {Inject} from 'huject';
import {ApplicationContract} from "../Contracts/ApplicationContract";
import {DebugContract} from "../Contracts/DebugContract";

export class Debug implements DebugContract{

    @Inject("Application")
    private application: ApplicationContract;

    public __INFO(...args: any[])
    {
        if (this.application.getEnvironment() === "dev") {
            this.__PRINT("INFO", args);
        }
    }

    public __DEBUG(...args: any[])
    {
        if (this.application.getEnvironment() === "dev") {
            this.__PRINT("DEBUG", args);
        }
    }

    public __WARNING(...args: any[])
    {
        this.__PRINT("WARNING", args);
    }

    public __ERROR(...args: any[])
    {
        this.__PRINT("ERROR", args);
    }

    public __PRINT(severity: string, ...args: any[])
    {
        args.unshift("["+severity+"]");
        console.log.apply(null, args);
    }
}
