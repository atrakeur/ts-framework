export interface IDatabaseDriverUnique<T> {

    /**
     * Register query method WHERE
     * @param {ISingleResultCallback<T>} callback
     */
    done(callback: ISingleResultCallback<T>);
}