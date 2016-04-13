import { IMultipleResultCallback, ISingleResultCallback, INoResultCallback } from "Http"
Import {  IDatabaseDriver, IDatabaseDriverEnd, IDatabaseDriverUnique, IDatabaseDriverRaw} from "DatabaseDriver"
import { IModelValidation } from "ModelValidation"
/**
 * TS-Framework application
 * This class contains definitons of methods for comunication with DatabaseDriver
 */

export interface IModel<T> {
 
    /**
     * WL collection     
     */   
    private collection: WL.Collection;
 
     /**
     * Save flag
     * @param {ISingleResultCallback<T>} callback
     */   
    save:<T> (callback: ISingleResultCallback<T>) => void;
 
    /**
     * Destroy flag
     * @param {INoResultCallback<T>} callback
     */   
    destroy:<T> (callback: INoResultCallback<T>) => void;
 
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
     * @param {T} model
     * @param {IDatabaseDriverEnd<T>} callback
     */   
    all<T>() : IDatabaseDriverEnd;
    
    /**
     * Model Where
     * @param {} query
     */   
    where<T>(query: {});
    
    /**
     * Model Get
     * @param {T} model
     * @param {IDatabaseDriverUnique<T>} callback
     */   
    get<T>(id: number) : IDatabaseDriverUnique<any>;
    
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