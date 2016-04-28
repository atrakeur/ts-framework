/**
 * TS-Framework ISingleResultCallback<T>
 * Callback for generic model
 */
export interface ISingleResultCallback<T>
{
    (err: Error, model: T);
}