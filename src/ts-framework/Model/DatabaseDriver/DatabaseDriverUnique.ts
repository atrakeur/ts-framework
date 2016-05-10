import {ISingleResultCallback} from "../ISingleResultCallback";
import {IDatabaseDriverUnique} from "./IDatabaseDriverUnique";

/**
 * TS-Framework DatabaseDriverUnique
 * Contains method for oparation with WL Query
 * @parameter T
 */

//needs to refactor class name !!!
export class DatabaseDriverUnique<T> implements IDatabaseDriverUnique<T> {

    /**
     * Register query method WHERE
     * @param {ISingleResultCallback<T>} callback
     */
    public done(callback: ISingleResultCallback<T>) {

    }
}