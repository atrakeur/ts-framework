///<reference path="../../../typings/main.d.ts" />

import * as _ from "lodash";
import {ConfigurationContract} from "./Contracts/ConfigurationContract";

/**
 * Configuration container used to store data on runtime
 * @todo Throwing an exception when calling Configuration#get() if the key is not found would be smarter, as it's instantly clear a key doesn't exist
 * @todo Proposal to make Configuration#set() read-only, so it can't be overwritten once set
 */
export class Configuration implements ConfigurationContract
{
    /**
     * Container holding all configuration keys
     * @type {Object}
     */
    private data: {[s: string]: any} = {};

    /**
     * Fetch a key from the configuration data
     * @param {string} key
     * @returns {*}
     */
    get(key: string): any
    {
        var keyParts = key.split('.');
        return _.reduce(keyParts, (data, key) => !!data ? data[key] : undefined, this.data);
    }

    /**
     * Set a key in the configuration
     * @todo Why are we splitting the key exactly, can't we just store it as is? ~@Paradoxis
     * @param {string} key
     * @param {*} value
     * @returns {void}
     */
    set(key: string, value: any)
    {
        // Split the key into parts
        var keyParts = key.split('.');
        var data = this.data;

        // Loop over all the data
        _.forEach(keyParts, (key) => {
            if (key == _.last(keyParts)) {
                data[key] = value;
            } else {
                data[key] = typeof data[key] == 'object' ? data[key] : {};
            }

            data = data[key];
        });
    }
}