import {IMultipleResultCallback} from "../IMultipleResultCallback";
import {IDatabaseDriverEnd} from "./IDatabaseDriverEnd";

/**
 * TS-Framework DatabaseDriver
 * Contains method for oparation with WL Query
 * @parameter T
 */

//needs to refactor class name !!!
export class DatabaseDriverEnd<T> implements IDatabaseDriverEnd<T> {

    /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
     */
    public done(callback: IMultipleResultCallback<T>) {

    }
}