import * as Express from "express";
import * as Http from "http";
import * as BodyParser from "body-parser";
import { Inject } from "huject";
import {ConfigurationContract} from "../Contracts/ConfigurationContract";
import {DebugContract} from "../Contracts/DebugContract";

/**
 * Provides an http server to the application
 * Use port item in Configuration
 * Use Router to handle requests
 */
export class HttpServer {

    public server: Http.Server;
    public express: any;

    @Inject("Configuration")
    private config: ConfigurationContract;

    @Inject("Debug")
    private debug: DebugContract;

    public constructor() {
        this.express = Express();
        this.server = Http.createServer(this.express);
    }

    public start() {
        this.express.use(Express.static(process.cwd() + "/public/"));
        this.express.use(BodyParser.json());
        this.express.use(BodyParser.urlencoded({extended: true}));

        // Make express listen
        this.server.listen(this.config.get("port"));

        // Display a start message
        this.debug.__INFO("Server listening on port: " + this.config.get("port"));
    }

    public getExpress(): Express.Application {
        return this.express;
    }

    public getServer(): Http.Server {
        return this.server;
    }

}
