export interface IDatabaseDriverEnd<T> {

    /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
     */
    done(callback: IMultipleResultCallback<T>);
}