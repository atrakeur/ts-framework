/// <reference path="../../typings/main.d.ts" />

import {Configuration} from "./Configuration";

/**
 * TS-Framework application
 * This class is a wrapper around the default express server
 * It will load controllers, models and routes automatically
 */
export class Application
{
    /**
     * Configuration object
     * @type {Configuration}
     */
    private config: Configuration;

    /**
     * Express server we're creating a wrapper for
     * @type {Express.Application}
     */
    private express: Express.Application;

    /**
     * Application constructor
     * Developer must define the default root directory of the application
     * @param {string} rootDirectory
     */
    public constructor(private rootDirectory: string)
    {
        // ...
    }

    /**
     * Registers all controllers and models accordingly, and starts the express server
     * @param {number} port
     */
    public start(port: number)
    {
        // ...
    }
}