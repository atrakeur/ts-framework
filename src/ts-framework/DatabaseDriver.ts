import { IMultipleResultCallback, ISingleResultCallback, INoResultCallback } from "./Http"

/**
 * TS-Framework DatabaseDriver
 * Contains method for oparation with WL Query
 * @parameter T
 */
export class DatabaseDriver<T> implements IDatabaseDriver<T> { 
    
     /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    public where(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }
        
   /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    public order(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }
    
   /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    public skip(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }
    
   /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    public limit(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }
    
   /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
    */
    public done(callback: IMultipleResultCallback<T>) {
        
    }
}

export interface IDatabaseDriver<T> {
    
   /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    where(query: {}) : IDatabaseDriver<T>;
    
    
   /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    order(query: {}) : IDatabaseDriver<T>;
    
   /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    skip(query: {}) : IDatabaseDriver<T>;
    
   /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    limit(query: {}) : IDatabaseDriver<T>;
    
   /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
    */
    done(callback: IMultipleResultCallback<T>)
}

//----------------------------------------------------------------------------------

/**
 * TS-Framework DatabaseDriver
 * Contains method for oparation with WL Query
 * @parameter T
 */

//needs to refactor class name !!!
export class DatabaseDriverEnd<T> implements DatabaseDriverEnd<T> { 
       
   /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
    */
    public done(callback: IMultipleResultCallback<T>) {
        
    }
}

export interface IDatabaseDriverEnd<T> {
    
     /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
    */
    done(callback: IMultipleResultCallback<T>);     
}

//----------------------------------------------------------------------------------

/**
 * TS-Framework DatabaseDriverUnique
 * Contains method for oparation with WL Query
 * @parameter T
 */

//needs to refactor class name !!!
export class DatabaseDriverUnique<T> implements DatabaseDriverUnique<T> { 
       
   /**
     * Register query method WHERE
     * @param {ISingleResultCallback<T>} callback
    */
    public done(callback: ISingleResultCallback<T>) {
        
    }
}

export interface IDatabaseDriverUnique<T> {
    
     /**
     * Register query method WHERE
     * @param {ISingleResultCallback<T>} callback
    */
    done(callback: ISingleResultCallback<T>);     
}

//----------------------------------------------------------------------------------

/**
 * TS-Framework DatabaseDriverUnique
 * Contains method for oparation with WL Query
 * @parameter T
 */

//needs to refactor class name !!!
export class DatabaseDriverRaw<T> implements IDatabaseDriverRaw<T> { 
       
   /**
     * Register query method WHERE
     * @param {ISingleResultCallback<T>} callback
    */
    public done(callback: ISingleResultCallback<T>) {
        
    }
}

export interface IDatabaseDriverRaw<T> {
    
     /**
     * Register query method WHERE
     * @param {ISingleResultCallback<T>} callback
    */
    done(callback: ISingleResultCallback<T>);     
}