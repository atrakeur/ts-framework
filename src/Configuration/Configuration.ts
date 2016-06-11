import * as _ from "lodash";
import * as fs from "fs";

import {Inject} from "huject";
import {ConfigurationContract} from "../Core/Contracts/ConfigurationContract";
import {ApplicationContract} from "../Core/Contracts/ApplicationContract";
import {AutoLoaderContract} from "../Core/Contracts/AutoLoaderContract";

/**
 * Configuration container used to store data on runtime
 */
export class Configuration implements ConfigurationContract
{

    private nconf = require('nconf');

    @Inject("AutoLoader")
    private autoloader: AutoLoaderContract;

    @Inject("Application")
    private application: ApplicationContract;

    constructor() {
        this.nconf.use('memory');
    }

    load() {
        //Force env & version
        this.set("env", this.application.getEnvironment());
        this.set("tsfw-version", this.application.getVersion());
        this.set("port", 3000);

        var instance = this.nconf;
        this.autoloader.getLookupPath().forEach(function(path) {
            if(fs.existsSync(path + 'config.json')) {
                instance.file(path + 'config.json');
            }
        });

        var env = this.get("env");

        if (env) {
            this.autoloader.getLookupPath().forEach(function(path) {
                if (fs.existsSync(path + 'config."+env+".json')) {
                    instance.file(path + 'config.json');
                }
            });
        }

        this.nconf.argv();
    }


    /**
     * Fetch a key from the configuration data
     * @param {string} key
     * @returns {*}
     */
    get(key: string): any
    {
        return this.nconf.get(key);
    }

    /**
     * Set a key in the configuration
     * @param {string} key
     * @param {*} value
     * @returns {void}
     */
    set(key: string, value: any)
    {
        this.nconf.set(key, value);
    }
}
