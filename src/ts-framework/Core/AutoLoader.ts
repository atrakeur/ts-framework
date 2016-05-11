/// <reference path="../../../typings/main.d.ts" />
/// <reference path="../../../node_modules/huject/huject.d.ts" />

import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

import {__DEBUG} from "./Debug";
import {AutoLoaderException} from "./Exception";
import {Container} from "huject";
import {Application} from "./Application";
import {ServiceProvider} from "./ServiceProvider";

/**
 * AutoLoader class
 * This class handle all the autoloading of the application
 *
 * Basicaly it execute each ServiceProvider boot and start methods.
 * Each of them is then responsible to register every service to the application and container
 */
export class AutoLoader
{

    private lookupPaths = [
        path.normalize(__dirname+"/"),                                      //running application path (usercode)
        path.normalize(__dirname+"/../../ts-framework/"),                   //from source framework installation (git)
        path.normalize(__dirname+"/../../ts-framework-tests/"),              //from source framework installation test (git)
        path.normalize(__dirname+"/../node_modules/ts-framework/lib")       //distribution framework installation (npm)
    ];

    /**
     * Collection of all service providers
     * @type {{}}
     */
    private serviceProviders = [];

    /**
     * Collection of all service providers
     * @type {{}}
     */
    private serviceProvidersFiles = [];

    /**
     * Create a new Autoloader that will load instances to the given container
     * @param application
     * @param container the dependency injection container to fill
     */
    public constructor(private application: Application, private container: Container)
    {
        //empty
    }

    /**
     * @returns {string[]} the list of path to lookup when loading
     */
    public getLookupPath() {
        return this.lookupPaths;
    }

    /**
     * Add and trigger a service provider
     * @param serviceProvider
     */
    public addServiceProvider(serviceProvider: string): void
    {
        this.serviceProvidersFiles.push(serviceProvider);
    }

    /**
     * Try to load a file into the framework
     * @returns {void}
     * @param filename
     */
    loadFile(filename: string)
    {
        var found = false;
        var module = this.lookupPaths.forEach((path: string) => {
            let file = path + filename;
            if (fs.existsSync(file)) {
                // Require the module
                let module: Object = require(file);

                // Since there's a possibility the developer put more than one controller in the
                // class (not advised), we'll be looping over the object to find possible candidates
                for (let name in module)
                {
                    if (module.hasOwnProperty(name))
                    {
                        //The object is a service provider
                        if (module[name].prototype instanceof ServiceProvider) {
                            __DEBUG(`Loaded service provider: ${name}`);
                            //let base = _.kebabCase(name.replace("ServiceProvider", ""));
                            this.serviceProviders.push(new module[name]());
                            found = true;
                            continue;
                        }

                        // Something is terribly wrong
                        return module;
                    }
                }
            }
        });

        if (!found) {
            __DEBUG("WARNING: File "+filename+" not found during startup");
        }

        return module;
    }

    /**
     * @returns {Array} of all service providers registered
     */
    public getServiceProviders() {
        return this.serviceProviders;
    }

    /**
     * Load all models/controllers into memory
     * @returns {void}
     */
    public load(): void
    {
        this.serviceProvidersFiles.forEach(serviceProvider => {
            this.loadFile(serviceProvider);
        });
    }

    /**
     * Boot all services providers
     */
    public boot() {
        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.boot(this.container);
        });
    }

    public start() {
        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.start(this.application, this.container);
        });
    }
}
