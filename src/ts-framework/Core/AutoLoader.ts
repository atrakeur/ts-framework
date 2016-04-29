/// <reference path="../../../typings/main.d.ts" />
import * as fs from "fs";
import * as _ from "lodash";

import {__DEBUG} from "./Debug";
import {AutoLoaderException} from "./Exception";
import {Controller} from "../Controller/Controller";
import {ControllerCollection} from "../Controller/ControllerCollection";
import {Model} from "../Model/Model";
import {ModelCollection} from "../Model/ModelCollection";

/**
 * AutoLoader class
 * Responsible for require'ing all models and controllers
 */
export class AutoLoader
{
    /**
     * Collection of all models
     * Format: name => model object
     * @type {Object}
     */
    private models: ModelCollection = {};

    /**
     * Collection of all controllers
     * Format: name => controller object
     * @type {Object}
     */
    private controllers: ControllerCollection = {};


    /**
     * Directory include paths
     * @see AutoLoader#addDirectory()
     * @type {string[]}
     */
    private directories: string[] = [];

    /**
     * Add a directory to the list of auto-loaders
     * Checks if the path exists before registering it in the directory index
     * @param {string} directory
     * @returns {void}
     */
    public addDirectory(directory: string): void
    {
        if (fs.existsSync(directory)) {
            this.directories.push(directory);
        } else {
            throw new AutoLoaderException(`Directory '${directory}' does not exist!`);
        }
    }

    /**
     * Load all models/controllers into memory
     * @returns {void}
     */
    public load(): void
    {
        // Loop over all the directories
        this.directories.forEach(directory => {

            // Load all files from the directory and loop over them
            fs.readdirSync(directory).forEach(file => {

                // Skip source mappings or definition files
                if (_.endsWith(file, ".d.ts") || _.endsWith(file, ".js.map")) {
                    return;
                }

                // Check if file file is a controller
                if (_.endsWith(file, "Controller.js") || _.endsWith(file, "Model.js")) {
                    this.loadAbstract(directory, file);
                    return;
                }

                // File doesn't seem to match any of the signatures, lets warn the user
                console.warn(`File '${file}' in '${directory}' doesn't match controller or model name signature!`);
            });
        });
    }

    /**
     * Require a file, and load the controllers/models in it into their designated directories
     * @param {string} directory
     * @param {string} file
     * @returns {void}
     */
    private loadAbstract(directory: string, file: string)
    {
        // Require the module
        let module: Object = require(directory + file);

        // Since there's a possibility the developer put more than one controller in the
        // class (not advised), we'll be looping over the object to find possible candidates
        for (let name in module)
        {
            if (module.hasOwnProperty(name))
            {
                // The object in the module is a controller
                if (module[name].prototype instanceof Controller) {
                    __DEBUG(`Loaded controller: ${file}`);
                    let base = _.kebabCase(name.replace("Controller", ""));
                    this.controllers[base] = new module[name]();
                    continue;
                }

                // The object in the module is a model
                if (module[name].prototype instanceof Model) {
                    __DEBUG(`Loaded model: ${file}`);
                    let base = _.kebabCase(name.replace("Model", ""));
                    this.models[base] = new module[name]();
                    continue;
                }

                // Something is terribly wrong
                __DEBUG(`Exported object '${name}' in '${file}' is neither a model nor a controller`);
            }
        }
    }

    /**
     * Returns the collection of controllers that were found by AutoLoader#load()
     * @returns {ControllerCollection}
     */
    public getControllers(): ControllerCollection
    {
        return this.controllers;
    }

    /**
     * Returns the collection of models that were found by AutoLoader#load()
     * @returns {ModelCollection}
     */
    public getModels(): ModelCollection
    {
        return this.models;
    }
}
