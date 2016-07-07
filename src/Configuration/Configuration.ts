import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";

import {Inject} from "huject";
import {ConfigurationContract} from "../Contracts/ConfigurationContract";
import {ApplicationContract} from "../Contracts/ApplicationContract";
import {AutoLoaderContract} from "../Contracts/AutoLoaderContract";

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
        this.nconf.argv();
    }

    load() {
        //Force env & version
        this.set("tsfw-version", this.application.getVersion());

        var instance = this.nconf;
        if(fs.existsSync(process.cwd() + '/config.json')) {
            instance.file(process.cwd() + '/config.json');
        }

        var env = this.get("env");
        if (env) {
            if (fs.existsSync(process.cwd() + '/config.'+env+'.json')) {
                instance.file(process.cwd() + '/config.json');
            }
        } else {
            this.set("env", "production");
        }

        if (this.get("port") == null) {
            this.set("port", 3000);
        }
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
