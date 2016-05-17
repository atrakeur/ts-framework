///<reference path="../../../typings/main.d.ts" />

import * as _ from "lodash";
import * as fs from "fs";
import {__INFO} from "../Core/Debug";
import {ConfigurationContract} from "../Core/Contracts/ConfigurationContract";
import {Inject} from "huject";
import {AutoLoader} from "../Core/AutoLoader";
import {Application} from "../Core/Application";

/**
 * Configuration container used to store data on runtime
 */
export class Configuration implements ConfigurationContract
{

    private nconf = require('nconf');

    @Inject("AutoLoader")
    private autoloader: AutoLoader;

    load() {
        //Force env
        this.fixes("env", Application.getEnvironment());

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

    /**
     * Fixes a key to a given value
     * All next calls to set this key will be forgotten
     * @param key
     * @param value
     */
    fixes(key: string, value: any)
    {
        this.nconf.overrides({key: value});
    }
}