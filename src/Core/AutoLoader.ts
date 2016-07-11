import * as fs from "fs";
import * as path from "path";
import * as _ from "lodash";

import { AutoLoaderContract } from "../Contracts/Index";
import { Application, AutoLoaderException, ServiceProvider } from "./Index";
import { Container, Inject } from "huject";
import { LoaderContract } from "../Contracts/LoaderContract";

/**
 * AutoLoader class
 * This class handle all the autoloading of the application
 *
 * Basicaly it execute each ServiceProvider boot and start methods.
 * Each of them is then responsible to register every service to the application and container
 */
export class AutoLoader implements AutoLoaderContract
{

    private lookupPaths = [
        path.normalize(process.cwd()+"/build/"), //builded application user path
        path.normalize(__dirname+"/../"),        //framework path
    ];

    /**
     * Collection of all service providers
     * @type {{}}
     */
    public serviceProviders = [];

    /**
     * Collection of all service providers
     * @type {{}}
     */
    private serviceProvidersFiles = [];

    /**
     * List of all loaders to call when loading a new module
     * @type {Array}
     */
    private loaderInstances = [];

    /**
     * Create a new Autoloader that will load instances to the given container
     * @param application
     * @param container the dependency injection container to fill
     */
    public constructor(private application: Application, private container: Container) {
        //Empty
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
     * Load all modules from a directory
     * @param dirname
     */
    loadDirectory(dirname: string): any[] {
        var modules = [];
        this.lookupPaths.forEach((path: string) => {
            let fullpath = path + dirname;

            if (fs.existsSync(fullpath)) {
                var filenames:string[] = fs.readdirSync(fullpath);

                //Try to load all files in paths
                filenames.forEach((filename) => {
                    if (_.endsWith(filename, ".js")) {
                        modules.push(this.loadFileInternal(fullpath + filename));
                    }
                });
            }
        });

        return modules;
    }

    /**
     * Try to load a file into the framework
     * @returns {void}
     * @param filename
     */
    loadFile(filename: string) {
        var found = false;

        var module = this.lookupPaths.forEach((path: string) => {
            let file = path + filename;
            let module = this.loadFileInternal(file);
            if (module != null) {
                found = true;
                return module;
            }
        });

        if (!found) {
            throw new Error("Service Provider "+filename+" not found during startup");
        }

        return module;
    }

    /**
     * Internal load file
     * @param fullPath take the exact full path
     * @returns {null}
     */
    private loadFileInternal(fullPath: string): any {
        if (fs.existsSync(fullPath)) {
            // Require the module
            let module: Object = require(fullPath);

            // Since there's a possibility the developer put more than one controller in the
            // class (not advised), we'll be looping over the object to find possible candidates
            for (let name in module)
            {
                if (module.hasOwnProperty(name))
                {
                    //Run loaders on this instance
                    this.loaderInstances.forEach((loader: LoaderContract) => {
                        loader.loadModule(name, module[name]);
                    });
                }
            }

            return module;
        }

        return null;
    }

    /**
     * @returns {Array} of all service providers registered
     */
    public getServiceProviders() {
        return this.serviceProviders;
    }

    /**
     * Add a loader
     * @param loader
     */
    public registerLoader(loader: LoaderContract) {
        this.loaderInstances.push(loader);
    }

    /**
     * Load all models/controllers into memory
     * @returns {void}
     */
    public load(): void
    {
        this.registerLoader(new ServiceProviderLoader(this));

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
            serviceProvider.start(this.container);
        });
    }
}

export class ServiceProviderLoader implements LoaderContract {

    private autoloader: AutoLoader;

    public constructor(autoloader: AutoLoader) {
        this.autoloader = autoloader;
    }

    loadModule(name:string, module:any):void {
        //The object is a service provider
        if (module.prototype instanceof ServiceProvider) {
            this.autoloader.serviceProviders.push(new module());
        }
    }

}
