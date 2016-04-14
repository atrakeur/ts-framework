/// <reference path="../../typings/main.d.ts" />

import * as Express from "express";
import {Configuration} from "./Configuration";
import {Router} from "./Router";

/**
 * TS-Framework application
 * This class is a wrapper around the default express server
 * It will load controllers, models and routes automatically
 */
export class Application
{
    /**
     * Default port used by the application in development mode
     * @type {number}
     */
    public static DEFAULT_PORT = 3000;

    /**
     * Router object
     * @type {Router}
     */
    public router: Router;

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
        // Initialize router and configuration manager
        this.config = new Configuration();
        this.router = new Router(rootDirectory);

        // Define default settings
        this.config.set('env', Application.getEnvironment());
        this.config.set('port', Application.DEFAULT_PORT);
        this.config.set('static.path', 'public');
        this.config.set('view.path', 'app/views');
        this.config.set('view.engine', 'ejs');
        this.config.set('view.layout', false);
    }

    /**
     * Checks wether the project should run as development mode or production mode
     * @returns {string}
     */
    private static getEnvironment()
    {
        return ((process.env.NODE_ENV == null) ? 'development' : process.env.NODE_ENV);
    }

    /**
     * Get the version specified in package.json
     * @returns {string|number}
     */
    private static getVersion()
    {
        return require('root-require')('package.json').version
    }

    /**
     * Gets the URL of the GitHub repository that belongs to the application
     * @returns {string}
     */
    private static getRepositoryAddress()
    {
        let repo = require('root-require')('package.json').repository.url;
            repo = repo.replace("git://", "https://");
            repo = repo.replace(".git", "");
        return String(repo);
    }

    /**
     * Add or override a pre-defined route
     * @param {string} path
     * @param {string} action
     * @returns {void}
     */
    public addRoute(path: string, action: string)
    {
        // ...
    }

    /**
     * Registers all controllers and models accordingly, and starts the express server
     * @param {number|null} port
     * @returns {void}
     */
    public start(port: number = null): void
    {
        // If no port was given, fetch from config or use the default port
        if (port == null) {
            port =  this.config.get("port") || Application.DEFAULT_PORT;
        }

        // Build all dependencies
        this.buildExpress();

        // Make express listen
        this.express.listen(port);

        // Display a start message
        this.printHeader();
        console.log("");
        console.log("Server listening on port: %d", port);
    }

    /**
     * Build the express application
     * @returns {void}
     */
    private buildExpress(): void
    {
        this.express = Express();
    }

    /**
     * Prints out a pretty ASCII art header for the framework startup
     * @returns {void}
     */
    private printHeader(): void
    {
        console.log("-----------------------------------------------------------------------------     ");
        console.log("   ___________       ______                                             __        ");
        console.log("  /_  __/ ___/      / ____/________ _____ ___  ___ _      ______  _____/ /__      ");
        console.log("   / /  \\__ \\______/ /_  / ___/ __ `/ __ `__ \\/ _ \\ | /| / / __ \\/ ___/ //_/ ");
        console.log("  / /  ___/ /_____/ __/ / /  / /_/ / / / / / /  __/ |/ |/ / /_/ / /  / ,<         ");
        console.log(" /_/  /____/     /_/   /_/   \\__,_/_/ /_/ /_/\\___/|__/|__/\\____/_/  /_/|_|     ");
        console.log("                                                                                  ");
        console.log(" GitHub:  %s                                   ", Application.getRepositoryAddress());
        console.log(" Version: %s                                             ", Application.getVersion());
        console.log("-----------------------------------------------------------------------------     ");
    }
}