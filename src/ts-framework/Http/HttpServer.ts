import * as Express from "express";
import { Inject } from "huject";
import {ConfigurationContract} from "../Core/Contracts/ConfigurationContract";
import {__DEBUG, __INFO} from "../Core/Debug";

/**
 * Provides an http server to the application
 * Use port item in Configuration
 * Use Router to handle requests
 */
export class HttpServer {

    public express: Express.Application;

    @Inject("Configuration")
    private config: ConfigurationContract;

    public constructor() {
        this.express = Express();
    }

    public start() {
        console.log(this.config);
        // Make express listen
        this.express.listen(this.config.get("port"));

        // Display a start message
        __INFO("Server listening on port: " + this.config.get("port"));
    }

    public getExpress(): Express.Application {
        return this.express;
    }

}
