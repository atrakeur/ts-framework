import {Application} from "../Core/Application";
import {Inject} from "huject";
import * as fs from "fs";
import * as _ from "lodash";

export class Lang {

    @Inject("Application")
    private application: Application;

    private defaultLang;
    private langData = {};

    public loadLanguage(id: string) {
        this.langData[id] = {};

        var dir = this.application.getResourcesDirectory()+'/lang/'+id;
        if (fs.existsSync(dir)) {
            var filenames:string[] = fs.readdirSync(dir);
            filenames.forEach((filename) => {
                if (_.endsWith(filename, ".json")) {
                    var name = filename.replace(".json", "");
                    this.langData[id][name] = require(dir + "/" + filename);
                }
            });
        } else {
            throw new Error("Folder for lang "+id+" doesn't exists");
        }
    }

    public setLanguage(id: string) {
        if (!(id in this.langData)) {
            throw new Error("Language "+id+" isn't loaded");
        }

        this.defaultLang = id;
    }

    public get(ident: string) {
        var parts = ident.split(".");
        var root = this.langData[this.defaultLang];
        for (var index in parts) {
            if (parts[index] in root) {
                root = root[parts[index]];
            } else {
                return ident;
            }
        }

        return root;
    }

}