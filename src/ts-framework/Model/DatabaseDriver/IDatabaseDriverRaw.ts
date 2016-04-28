export interface IDatabaseDriverRaw<T> {

    /**
     * Register query method WHERE
     * @param {ISingleResultCallback<T>} callback
     */
    done(callback: ISingleResultCallback<T>);
}