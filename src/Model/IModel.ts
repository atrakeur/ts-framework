import { IDatabaseDriver, IDatabaseDriverEnd, IDatabaseDriverUnique, IDatabaseDriverRaw } from "./DatabaseDriver";
import { IModelValidation } from "./IModelValidation";
import { INoResultCallback } from "./INoResultCallback";
import { ISingleResultCallback } from "./ISingleResultCallback";


export interface IModel {
    /**
     * Model Save
     * @param {T} model
     * @param {ISingleResultCallback<T>} callback
     */
    save<T>(model: T, callback: ISingleResultCallback<T>);

    /**
     * Model Sestroy
     * @param {T} model
     * @param {INoResultCallback<T>} callback
     */
    destroy<T>(model: T, callback: INoResultCallback<T>);

    /**
     * Model All
     * @param {IDatabaseDriverEnd} callback
     */
    all<T>() : IDatabaseDriverEnd<T>;

    /**
     * Model Where
     * @param {} query
     */
    where(query: {});

    /**
     * Model Get
     * @param {number} id
     * @return {IDatabaseDriverUnique<any>} callback
     */
    get(id: number) : IDatabaseDriverUnique<any>;

    /**
     * Model First
     * @param {number} id
     * @return {IDatabaseDriverUnique<T>} callback
     */
    first<T>(id: number) : IDatabaseDriverUnique<T>;

    /**
     * Model Find
     */
    find<T>() : IDatabaseDriver<T>;

    /**
     * Model Query
     * @param {number} id
     * @return {IDatabaseDriverRaw<T>}
     */
    query<T>(id: number) : IDatabaseDriverRaw<T>;

    /**
     * Model validate
     * @param {string} attr
     * @param {IModelValidation} options
     */
    validate(attr: string, options: IModelValidation);

    /**
     * Model validate
     * @param {string[]} attrs
     * @param {IModelValidation} definition
     */
    validate(attrs: string[], definition: IModelValidation);

    /**
     * Model validate
     * @param {any} obj
     * @param {IModelValidation} definition
     */
    validate(obj: any, definition: IModelValidation);
}