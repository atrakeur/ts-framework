/**
 * TS-Framework INoResultCallback<T>
 * Callback for no result
 */
export interface INoResultCallback<T> { 
    (err: Error);
 }

/**
 * TS-Framework ISingleResultCallback<T>
 * Callback for generic model
 */
export interface ISingleResultCallback<T> { 
    (err: Error, model: T); 
}

/**
 * TS-Framework IMultipleResultCallback<T>
 * Callback for collection of models
 */
export interface IMultipleResultCallback<T> { 
    (err: Error, models: T[]); 
}

export class Request {
    //...   
}

export class Reply {
    //...   
}

export class Response {
    //...   
}