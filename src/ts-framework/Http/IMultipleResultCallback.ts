/**
 * TS-Framework IMultipleResultCallback<T>
 * Callback for collection of models
 */
export interface IMultipleResultCallback<T>
{
    (err: Error, models: T[]);
}