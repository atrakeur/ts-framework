export interface INoResultCallback<T> { (err: Error); }
export interface ISingleResultCallback<T> { (err: Error, model: T); }
export interface IMultipleResultCallback<T> { (err: Error, models: T[]); }

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
     * @param {} query
     * @return IDatabaseDriver<T>
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
     * @param {} query
     * @return IDatabaseDriver<T>
    */
    done(callback: IMultipleResultCallback<T>)
}