import * as Express from "express";
import { Inject } from "huject";
import {ConfigurationContract} from "../Contracts/ConfigurationContract";
import {DebugContract} from "../Contracts/DebugContract";

/**
 * Provides an http server to the application
 * Use port item in Configuration
 * Use Router to handle requests
 */
export class HttpServer {

    public express: Express.Application;

    @Inject("Configuration")
    private config: ConfigurationContract;

    @Inject("Debug")
    private debug: DebugContract;

    public constructor() {
        this.express = Express();
    }

    public start() {
        // Make express listen
        this.express.listen(this.config.get("port"));

        // Display a start message
        this.debug.__INFO("Server listening on port: " + this.config.get("port"));
    }

    public getExpress(): Express.Application {
        return this.express;
    }

}
